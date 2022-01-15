// eslint-disable-next-line consistent-return
export const validateMessage = (value: string) => {
  if (Number.isNaN(value)) {
    return 'Opção inválida, envie o código correto ou escreva SAIR.'
  }
}
