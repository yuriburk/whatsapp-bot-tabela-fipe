import axios from 'axios'

import { StepProps, steps } from "@steps/index";
import { storage } from "@storage/index";
import { getCategory } from '@steps/0-vehicleCategory';

export const getVehicle = async ({ from, message, name }: StepProps) => {
  if (!storage[from].model) {
    return steps[0].step({ from, message, name })
  }
  if (isNaN(Number(message))) {
    return 'Opção inválida, envie o código correto'
  }

  const index = Number(message) - 1

  const category = getCategory(storage[from].category ?? 1)
  const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/${category}/marcas/${storage[from].brand}/modelos/${storage[from].model}/anos`)

  if (!response?.data?.length || !response.data[index]) {
    return steps[0].step({ from, message, name })
  }

  const yearCode = response.data[index].codigo

  const { data } = await axios.get(`https://parallelum.com.br/fipe/api/v1/${category}/marcas/${storage[from].brand}/modelos/${storage[from].model}/anos/${yearCode}`)
  if (!data) {
    return 'Não encontrei resultados com esse código, tente outro'
  }

  storage[from].step = 0

  return `Estas são as informações sobre o seu veículo: \n\n-----------------------------------\nModelo: ${data.Modelo} \n Valor: ${data.Valor}`;
}
