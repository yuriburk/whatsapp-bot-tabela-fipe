import { create } from '@open-wa/wa-automate'

export const createClient = async () => {
  const client = await create({
    sessionId: 'fipe',
    multidevice: false
  })

  return client
}
