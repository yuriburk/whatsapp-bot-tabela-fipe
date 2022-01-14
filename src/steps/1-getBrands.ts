import axios from 'axios'

import { StepProps, steps } from "@steps/index";
import { storage } from "@storage/index";
import { getCategory } from '@steps/0-vehicleCategory';

export const getBrands = async ({ from, message }: StepProps) => {
  if (isNaN(Number(message))) {
    return 'Opção inválida, envie o código correto'
  }

  const category = getCategory(message)

  const { data } = await axios.get(`https://parallelum.com.br/fipe/api/v1/${category}/marcas`)

  let msg = 'Marcas \n\n'
  data.forEach((item: {codigo: string, nome: string}) => {
    msg += `${item.codigo} - ${item.nome}\n`
  })

  storage[from].step = 2
  storage[from].category = category === 'carros' ? 1 : 2

  return msg
}
