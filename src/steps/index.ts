import { storage } from '@storage/index'
import { vehicleCategory } from '@steps/0-vehicleCategory'
import { getBrands } from '@steps/1-getBrands'
import { getVehicle } from '@steps/4-getVehicle'
import { getBrandModels } from './2-getBrandModels'
import { getBrandModelYears } from './3-getBrandModelYears'

export type StepProps = { from: string; message: string; name: string }

export const steps = [
  {
    step: vehicleCategory
  },
  {
    step: getBrands
  },
  {
    step: getBrandModels
  },
  {
    step: getBrandModelYears
  },
  {
    step: getVehicle
  }
] as { step: (props: StepProps) => Promise<string> }[]

export function getStep(from: string) {
  if (storage[from]?.step) {
    return storage[from].step as number
  }
  storage[from] = {
    step: 0
  }

  return storage[from].step as number
}
