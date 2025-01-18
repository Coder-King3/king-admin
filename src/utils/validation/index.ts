import type {
  CallbackReturnFn,
  RuleParseFn,
  ValidationFn,
  ValidatorFn
} from './types'

const ruleParse: RuleParseFn = (rules, value) => {
  const { success, error } = rules.safeParse(value)

  return {
    success,
    message: error?.errors?.[0]?.message || ''
  }
}

const callbackReturn: CallbackReturnFn = (callback, { message, success }) => {
  if (!success) return callback(message)

  callback()
}

const validation: ValidationFn = (rules) => {
  const validator: ValidatorFn = (_, value, callback) => {
    const { success, message } = ruleParse(rules, value)

    callbackReturn(callback, { success, message })
  }

  return validator
}

export { callbackReturn, ruleParse, validation }
