import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { ErrorObject } from 'ajv'
import WrapperField from './WrapperField.svelte'

export interface Props<T extends JSONSchema7Type> {
  value?: T
  error?: ErrorObject
  schema?: JSONSchema7
  wrapper: any
}
export function createProps<T extends JSONSchema7Type>(): Props<T> {
  const props: Props<T> = {
    wrapper: WrapperField
  }

  return props
}

export function defaultValue<T extends JSONSchema7Type>(value?: T, schema?: JSONSchema7) {
  if (value === undefined && schema && 'default' in schema) {
    return schema.default as T
  }
  return value
}
