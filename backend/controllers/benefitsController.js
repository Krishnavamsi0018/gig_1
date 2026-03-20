const BENEFIT_RULES = {
  providentFund: { minDaysPerMonth: 15, minMonths: 6 },
  esi: { maxMonthlyEarnings: 21000, minMonths: 3 },
  maternity: { minWeeksWorked: 26 },
  gratuity: { minYearsService: 5 }
}

export function calculateBenefits(req, res) {
  const { workingDays, monthsActive, avgMonthlyEarning, platforms } = req.body
  if (!workingDays || !monthsActive || !avgMonthlyEarning) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const results = []
  let totalScore = 0

  const epfEligible = workingDays >= 15 && monthsActive >= 6
  results.push({ benefit: 'Provident Fund (EPF)', eligible: epfEligible, progress: Math.min(100, (monthsActive/6)*100), law: 'Code on Social Security 2020 - Ch. III', monthlyAmount: epfEligible ? Math.round(avgMonthlyEarning * 0.12) : 0 })
  if (epfEligible) totalScore += 25

  const esiEligible = avgMonthlyEarning <= 21000 && monthsActive >= 3
  results.push({ benefit: 'Employee State Insurance (ESI)', eligible: esiEligible, progress: Math.min(100, (monthsActive/3)*100), law: 'Code on Social Security 2020 - Ch. IV', monthlyAmount: esiEligible ? Math.round(avgMonthlyEarning * 0.0075) : 0 })
  if (esiEligible) totalScore += 25

  const maternityWeeks = monthsActive * 4.33
  const maternityEligible = maternityWeeks >= 26
  results.push({ benefit: 'Maternity Benefit', eligible: maternityEligible, progress: Math.min(100, (maternityWeeks/26)*100), law: 'Code on Social Security 2020 - Ch. VI' })
  if (maternityEligible) totalScore += 25

  const gratuityEligible = monthsActive >= 60
  results.push({ benefit: 'Gratuity', eligible: gratuityEligible, progress: Math.min(100, (monthsActive/60)*100), law: 'Code on Social Security 2020 - Ch. V', amount: gratuityEligible ? Math.round(avgMonthlyEarning * (monthsActive/12) * (15/26)) : 0 })
  if (gratuityEligible) totalScore += 25

  return res.json({
    totalScore,
    grade: totalScore >= 75 ? 'FULLY_PROTECTED' : totalScore >= 50 ? 'PARTIALLY_PROTECTED' : totalScore >= 25 ? 'MINIMAL_COVERAGE' : 'UNPROTECTED',
    benefits: results,
    generatedAt: new Date().toISOString()
  })
}
