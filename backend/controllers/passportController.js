import crypto from 'crypto'

// In-memory store for demo. Replace with DB later.
const passportStore = new Map()

export function generatePassport(req, res) {
  const { workerName, phone, platforms, totalEarnings, workingDays } = req.body

  if (!workerName || !platforms?.length) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Real SHA-256 hash using Node crypto — this IS real code
  const passportData = JSON.stringify({ workerName, phone, platforms, totalEarnings, workingDays, timestamp: Date.now() })
  const passportId = crypto.createHash('sha256').update(passportData).digest('hex')
  const shortId = passportId.slice(0, 16).toUpperCase()

  // Generate fake but realistic blockchain txn hash
  const txHash = '0x' + crypto.randomBytes(32).toString('hex')
  const blockNumber = Math.floor(Math.random() * 1000000) + 45000000

  const passport = {
    passportId,
    shortId,
    txHash,
    blockNumber,
    workerName,
    platforms,
    totalEarnings,
    workingDays,
    network: 'Polygon Mumbai',
    createdAt: new Date().toISOString(),
    verified: true
  }

  passportStore.set(passportId, passport)

  return res.json({ success: true, passport })
}

export function getPassport(req, res) {
  const { id } = req.params
  const passport = passportStore.get(id)
  if (!passport) return res.status(404).json({ error: 'Passport not found' })
  return res.json(passport)
}
