import { StepProps, steps } from '@steps/index'
import { storage } from '@storage/index'
import { getCategory } from '@steps/0-vehicleCategory'
import { validateMessage } from '@utils/validation'
import { api } from '@utils/api'

export const getBrandModels = async ({ from, message, name }: StepProps) => {
  if (!storage[from].category) {
    return steps[0].step({ from, message, name })
  }
  validateMessage(message)

  const category = getCategory(storage[from].category ?? 1)

  const { data } = await api.get(`${category}/brands/${message}/models`)
  if (!data?.length) {
    return 'Não encontrei resultados com esse código, tente outro ou digite SAIR.'
  }

  let msg = 'Informe o código equivalente do modelo do seu veículo: \n\n'
  data.forEach((item: { code: string; name: string }) => {
    msg += `${item.code} - ${item.name}\n`
  })

  storage[from].step = 3
  storage[from].brand = Number(message)

  return msg
}
