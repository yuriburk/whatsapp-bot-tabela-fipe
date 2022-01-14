import axios from 'axios'

import { StepProps, steps } from "@steps/index";
import { storage } from "@storage/index";
import { getCategory } from '@steps/0-vehicleCategory';

export const getBrandModelYears = async ({ from, message, name }: StepProps) => {
  if (!storage[from].brand) {
    return steps[0].step({ from, message, name })
  }
  if (isNaN(Number(message))) {
    return 'Opção inválida, envie o código correto'
  }

  const category = getCategory(storage[from].category ?? 1)

  const { data } = await axios.get(`https://parallelum.com.br/fipe/api/v1/${category}/marcas/${storage[from].brand}/modelos/${message}/anos`)

  if (!data?.length) {
    return 'Não encontrei resultados com esse código, tente outro'
  }

  let msg = 'Ano \n\n'
  data.forEach((item: {codigo: string, nome: string}, index: number) => {
    msg += `${index + 1} - ${item.nome}\n`
  })

  storage[from].step = 4
  storage[from].model = Number(message)

  return msg
}
