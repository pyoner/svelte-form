import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { FieldProps } from './types'

export function createProps<T extends JSONSchema7Type>(): FieldProps<T> {
  const props: FieldProps<T> = {
    value: null,
    error: null
  }

  return props
}

export function defaultValue<T extends JSONSchema7Type>(value: T, schema?: JSONSchema7) {
  if (value === null && schema && 'default' in schema) {
    return schema.default as T
  }
  return value
}

export function resetField(field: JSONSchema7Type, schema?: JSONSchema7): JSONSchema7Type {}
