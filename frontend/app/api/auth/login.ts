import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from 'next-auth/react'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body
    await signIn('credentials', { email, password })
 
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}