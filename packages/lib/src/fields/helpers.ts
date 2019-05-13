import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { Props } from '../types'

export function createProps<T extends JSONSchema7Type>(): Props<T> {
  const props: Props<T> = {}

  return props
}

export function defaultValue<T extends JSONSchema7Type>(value?: T, schema?: JSONSchema7) {
  if (value === undefined && schema && 'default' in schema) {
    return schema.default as T
  }
  return value
}
