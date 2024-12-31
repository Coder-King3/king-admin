import type { FormItemRule } from 'element-plus'
import type { ZodType } from 'zod'
export { z } from 'zod'

type ValidatorFn = FormItemRule['validator']
type HandlerFn = (success: boolean, message: string) => void

interface ZodParseResult {
  success: boolean
  message: string
}

type ZodParseFn = (rules: ZodType, value: any) => ZodParseResult

type CallbackReturnFn = (
  callback: (error?: string | Error) => void,
  result: ZodParseResult
) => void
type ZodValidatorFn = (rules: ZodType, handler?: HandlerFn) => ValidatorFn

export const zodParse: ZodParseFn = (rules, value) => {
  const result = rules.safeParse(value)

  return {
    success: result.success,
    message: result.error?.issues?.[0]?.message || 'Invalid'
  }
}

export const callbackReturn: CallbackReturnFn = (
  callback,
  { success, message }
) => {
  if (!success) callback(new Error(message))

  callback()
}

export const zodValidator: ZodValidatorFn = (rules, handler) => {
  const validator: ValidatorFn = (_, value, callback) => {
    const { success, message } = zodParse(rules, value)

    handler?.(success, message)

    callbackReturn(callback, { success, message })
  }

  return validator
}
