import type { ZodTypeAny } from 'zod'

import type {
  CallbackReturnFn,
  RuleParseFn,
  ValidationFn,
  ValidatorFn
} from './types'

const ruleParse: RuleParseFn = (rules, value) => {
  const { error, success } = rules.safeParse(value)

  return {
    message: error?.errors?.[0]?.message || '',
    success
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
      const { message, success } = ruleParse(rules as ZodTypeAny, value)

      callbackReturn(callback, { message, success })
    }
  }

  return {
    trigger,
    validator
  }
}

export { callbackReturn, ruleParse, validation }
