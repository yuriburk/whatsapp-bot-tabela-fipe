import { StepProps, steps } from '@steps/index'
import { storage } from '@storage/index'
import { getCategory } from '@steps/0-vehicleCategory'
import { validateMessage } from '@utils/validation'
import { api } from '@utils/api'

export const getVehicle = async ({ from, message, name }: StepProps) => {
  if (!storage[from].model) {
    return steps[0].step({ from, message, name })
  }
  validateMessage(message)

  const index = Number(message) - 1

  const category = getCategory(storage[from].category ?? 1)
  const response = await api.get(
    `${category}/brands/${storage[from].brand}/models/${storage[from].model}/years`
  )

  if (!response?.data?.length || !response.data[index]) {
    return steps[0].step({ from, message, name })
  }

  const yearCode = response.data[index].code

  const { data } = await api.get(
    `${category}/brands/${storage[from].brand}/models/${storage[from].model}/years/${yearCode}`
  )
  if (!data) {
    return 'Não encontrei resultados com esse código, tente outro ou digite SAIR.'
  }

  const { data: car } = await api.get(
    `${category}/${data.codeFipe}/years/${yearCode}/history`
  )
  storage[from].step = 0

  return `Estas são as informações sobre o seu veículo: \n\nMarca: ${
    car.brand
  }\nModelo: ${car.model}\nAno: ${car.modelYear}\nValor: ${car.priceHistory
    .map(
      ({ month, price }: { month: string; price: string }) =>
        `${month.charAt(0).toUpperCase() + month.slice(1)} - ${price}`
    )
    .join('\n')}`
}
