import { create } from 'venom-bot'

export const createClient = async () => {
  const client = await create({
    session: 'fipe',
    multidevice: false
  })

  return client
}
