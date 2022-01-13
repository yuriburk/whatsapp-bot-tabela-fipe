import { Whatsapp } from 'venom-bot'

import { createClient } from '@utils/log'

function start(client: Whatsapp) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome')
        .then((result) => {
          console.log('Result: ', result);
        })
        .catch((error) => {
          console.error('Error when sending: ', error);
        });
    }
  });
}

createClient().then(client => start(client))
