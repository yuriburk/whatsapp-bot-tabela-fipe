import { StepProps, steps } from '@steps/index'
import { storage } from '@storage/index'
import { getCategory } from '@steps/0-vehicleCategory'
import { validateMessage } from '@utils/validation'
import { api } from '@utils/api'

export const getBrandModelYears = async ({
  from,
  message,
  name
}: StepProps) => {
  if (!storage[from].brand) {
    return steps[0].step({ from, message, name })
  }
  validateMessage(message)

  const category = getCategory(storage[from].category ?? 1)
  const { data } = await api.get(
    `${category}/brands/${storage[from].brand}/models/${message}/years`
  )
  if (!data?.length) {
    return 'Não encontrei resultados com esse código, tente outro ou digite SAIR.'
  }

  let msg = 'Informe o código do ano do seu veículo: \n\n'
  data.forEach((item: { code: string; name: string }, index: number) => {
    msg += `${index + 1} - ${item.name}\n`
  })

  storage[from].step = 4
  storage[from].model = Number(message)

  return msg
}
