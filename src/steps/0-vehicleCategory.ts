import { storage } from '@storage/index'
import { StepProps } from '@steps/index'

export const getCategory = (message: string | number) =>
  String(message) === '1' ? 'cars' : 'motorcycles'

export const vehicleCategory = async ({ from, name }: StepProps) => {
  storage[from].step = 1

  return (
    `👋 Olá ${name}, como vai? \n\n` +
    'Para consultar a *tabela fipe*, escolha primeiro o típo de veículo:\n-----------------------------------\n1️⃣ - ```Carro``` \n2️⃣ - ```Moto```'
  )
}
