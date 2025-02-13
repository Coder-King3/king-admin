import type { ZodTypeAny } from 'zod'

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

const validation: ValidationFn = (rules, trigger = 'change') => {
  let validator: ValidatorFn
  if (typeof rules === 'function') {
    validator = rules
  } else {
    validator = (_, value, callback) => {
      const { success, message } = ruleParse(rules as ZodTypeAny, value)

      callbackReturn(callback, { success, message })
    }
  }

  return {
    trigger,
    validator
  }
}

export { callbackReturn, ruleParse, validation }
