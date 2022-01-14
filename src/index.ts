import { Whatsapp } from 'venom-bot'

import { createClient } from '@client/index'
import { getStep, steps } from '@steps/index';
import { storage } from '@storage/index';

function start(client: Whatsapp) {
  client.onMessage(async (message) => {
    if (!message.isGroupMsg){
      try {
        const currentStep = getStep(message.from)
        const {step} = steps[currentStep];

        const text = await step({from: message.from, message: message.body, name: message.sender.name})
        client
        .sendText(message.from, text)
        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((error) => {
          console.error('Error when sending: ', error);
        });
      } catch {
        storage[message.from].step = 0
        client.sendText(message.from, 'Ocorreu um erro na busca').catch(() => {})
      }
    }
  });

  process.on('SIGINT', function () {
    client.close();
  });
}

createClient().then(client => start(client))
