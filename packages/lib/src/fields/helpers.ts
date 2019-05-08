import { JSONSchema } from 'json-schema-typed'
import { ErrorObject } from 'ajv'
import WrapperField from './WrapperField.svelte'

export interface Props<T> {
  value?: T
  error?: ErrorObject
  schema?: JSONSchema
  wrapper: any
}
export function createProps<T>(): Props<T> {
  const props: Props<T> = {
    wrapper: WrapperField
  }

  return props
}

export function defaultValue<T>(value?: T, schema?: JSONSchema) {
  if (value === undefined && schema && 'default' in schema) {
    return schema.default
  }
  return value
}
