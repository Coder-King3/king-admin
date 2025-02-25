import type { FormItemRule } from 'element-plus'
import type { ZodTypeAny } from 'zod'

interface ParseResult {
  message: string
  success: boolean
}

type RuleParseFn = (rules: ZodTypeAny, value: any) => ParseResult

type ValidatorFn = FormItemRule['validator']

type Trigger = 'blur' | 'change'
type ValidationFn = (
  rules: ValidatorFn | ZodTypeAny,
  trigger?: Trigger
) => FormItemRule

type CallbackReturnFn = (
  callback: (error?: Error | string) => void,
  result: ParseResult
) => void

export type { CallbackReturnFn, RuleParseFn, ValidationFn, ValidatorFn }
