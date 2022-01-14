import axios from 'axios'

import { StepProps, steps } from "@steps/index";
import { storage } from "@storage/index";
import { getCategory } from '@steps/0-vehicleCategory';

export const getBrandModels = async ({ from, message, name }: StepProps) => {
  if (!storage[from].category) {
    return steps[0].step({ from, message, name })
  }
  if (isNaN(Number(message))) {
    return 'Opção inválida, envie o código correto'
  }

  const category = getCategory(storage[from].category ?? 1)

  const { data } = await axios.get(`https://parallelum.com.br/fipe/api/v1/${category}/marcas/${message}/modelos`)

  if (!data?.modelos?.length) {
    return 'Não encontrei resultados com esse código, tente outro'
  }

  let msg = 'Modelos \n\n'
  data.modelos.forEach((item: {codigo: string, nome: string}) => {
    msg += `${item.codigo} - ${item.nome}\n`
  })

  storage[from].step = 3
  storage[from].brand = Number(message)

  return msg
}
