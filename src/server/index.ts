import { Client } from '@open-wa/wa-automate'

import { createClient } from '@client/index'
import { getStep, steps } from '@steps/index'
import { storage } from '@storage/index'

function start(client: Client) {
  client.onMessage(async message => {
    if (message.body === 'SAIR') {
      storage[message.from] = { step: undefined }
      return
    }
    if (
      !message.isGroupMsg &&
      (message.body === 'FIPE' || storage[message.from]?.step)
    ) {
      try {
        const currentStep = getStep(message.from)
        const { step } = steps[currentStep]

        const text = await step({
          from: message.from,
          message: message.body,
          name: message.sender.pushname
        })
        client
          .sendText(message.from, text)
          .then(result => {
            console.log('Result: ', result)
          })
          .catch(error => {
            console.error('Error: ', error)
          })
      } catch {
        storage[message.from].step = 0
        client.sendText(message.from, 'Ocorreu um erro na busca')
      }
    }
  })
  client.onStateChanged(state => {
    if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    if (state === 'UNPAIRED') {
      client.logout()
    }
  })
}

createClient().then(client => start(client))
