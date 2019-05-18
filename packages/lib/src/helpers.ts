import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { FieldProps, JSONObject } from './types'

export function createProps<T extends JSONSchema7Type>(): FieldProps<T> {
  const props: FieldProps<T> = {
    value: null,
    error: null
  }

  return props
}

export function objectDefaultValue(value: JSONObject | null, schema: JSONSchema7) {
  const v: JSONObject = {}
  const { properties } = schema
  if (properties) {
    for (let k in properties) {
      const propSchema = properties[k]

      if (typeof propSchema !== 'boolean') {
        const item = value && value[k]
        v[k] = defaultValue(item, propSchema)
      }
    }
  }
  return v
}

export function defaultValue<T extends JSONSchema7Type>(
  value: T | null,
  schema: JSONSchema7
): T | null {
  if (value === null && 'default' in schema) {
    value = schema.default as T
  }

  if (schema.type === 'object') {
    return objectDefaultValue(<JSONObject>value, schema) as T
  }

  return value
}

export function resetValue<T extends JSONSchema7Type>(value: T, schema: JSONSchema7): T | null {
  return defaultValue<T>(value, schema) || null
}
