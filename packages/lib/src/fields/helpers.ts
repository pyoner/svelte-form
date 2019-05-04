import { JSONSchema } from 'json-schema-typed'
import { ErrorObject } from 'ajv'
import WrapperField from './WrapperField.svelte'

export interface Props<T> {
  value: T | null
  error: ErrorObject | null
  schema: JSONSchema | null
  wrapper: any
}
export function makeProps<T>(): Props<T> {
  return {
    value: null,
    error: null,
    schema: null,
    wrapper: WrapperField
  }
}
