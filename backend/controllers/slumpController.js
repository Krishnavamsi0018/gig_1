import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Risk scoring algorithm — YOUR formula
function calculateRiskScore(earnings) {
  if (!earnings?.length) return { score: 0, level: 'UNKNOWN' }

  const avg = earnings.reduce((a, b) => a + b, 0) / earnings.length
  const variance = earnings.reduce((sum, e) => sum + Math.pow(e - avg, 2), 0) / earnings.length
  const stdDev = Math.sqrt(variance)
  const coefficientOfVariation = (stdDev / avg) * 100

  const recentAvg = earnings.slice(-7).reduce((a, b) => a + b, 0) / 7
  const trendScore = recentAvg < avg ? (avg - recentAvg) / avg * 100 : 0

  const threshold = avg * 0.6
  const lowDays = earnings.filter(e => e < threshold).length
  const lowDaysPercent = (lowDays / earnings.length) * 100

  const riskScore = Math.min(100, (coefficientOfVariation * 0.4) + (trendScore * 0.4) + (lowDaysPercent * 0.2))

  return {
    score: Math.round(riskScore),
    level: riskScore > 70 ? 'CRITICAL' : riskScore > 45 ? 'HIGH' : riskScore > 25 ? 'MODERATE' : 'LOW',
    avg: Math.round(avg),
    stdDev: Math.round(stdDev),
    coefficientOfVariation: Math.round(coefficientOfVariation),
    lowDaysPercent: Math.round(lowDaysPercent)
  }
}

export async function predictSlump(req, res) {
  const { earnings, platforms, workerName } = req.body

  const riskData = calculateRiskScore(earnings)

  let aiAdvice = ''
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a financial advisor for gig workers in India. Give brief, practical advice in 2-3 sentences. Be specific about income protection steps.'
        },
        {
          role: 'user',
          content: `Gig worker risk analysis: Risk Score ${riskData.score}/100, Level: ${riskData.level}, Average daily earnings: ₹${riskData.avg}, Income volatility: ${riskData.coefficientOfVariation}%. Give actionable advice.`
        }
      ],
      max_tokens: 150
    })
    aiAdvice = completion.choices[0]?.message?.content || ''
  } catch (e) {
    console.error('Groq error:', e.message)
    aiAdvice = 'Unable to generate AI advice at this time.'
  }

  return res.json({
    riskScore: riskData,
    aiAdvice,
    recommendation: riskData.score > 50 ? 'ACTIVATE_SLUMP_SHIELD' : 'MONITOR',
    suggestedInsuranceAmount: Math.round(riskData.avg * 15),
    generatedAt: new Date().toISOString()
  })
}
