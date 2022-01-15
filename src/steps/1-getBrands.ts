import { StepProps } from '@steps/index'
import { storage } from '@storage/index'
import { getCategory } from '@steps/0-vehicleCategory'
import { api } from '@utils/api'
import { validateMessage } from '@utils/validation'

export const getBrands = async ({ from, message }: StepProps) => {
  validateMessage(message)

  const category = getCategory(message)

  const { data } = await api.get(`${category}/brands`)
  let msg = 'Informe o código equivalente da marca do seu veículo: \n\n'
  data.forEach((item: { code: string; name: string }) => {
    msg += `${item.code} - ${item.name}\n`
  })

  storage[from].step = 2
  storage[from].category = category === 'cars' ? 1 : 2

  return msg
}
