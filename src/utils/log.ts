import { create } from 'venom-bot'

export const createClient = async () => {
  const client = await create({
    session: 'whatsapp',
    multidevice: false
  })

  return client
}
