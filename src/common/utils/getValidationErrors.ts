import { ValidationError } from 'yup'

interface Errors {
  // aqui só esclarece que nescessita de uma chave
  [key: string]: string
}

export default function getValidationErrors(error: ValidationError): Errors {
  const validationErrors: Errors = {}
  error.inner.forEach(error => {
    validationErrors[error.path] = error.message
  })
  return validationErrors
}
