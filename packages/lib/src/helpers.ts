import typeDetect from 'type-detect'
import { SvelteComponent } from 'svelte'

import { JSONObject, JSONSchema } from '@pyoner/svelte-form-common'

import { FieldProps, Errors, FormComponents, Props, SvelteSchema } from './types'

export function createProps<T extends any, E extends Errors = Error[]>(
  value: T | null = null
): FieldProps<T, E> {
  const props: FieldProps<T, E> = {
    value,
    errors: null
  }

  return props
}

export function objectDefaultValue(schema: JSONSchema, value: JSONObject | null): JSONObject {
  const v: JSONObject = {}
  const { properties } = schema
  if (properties) {
    for (let k in properties) {
      const propSchema = properties[k]

      if (typeof propSchema !== 'boolean') {
        const item = value && value[k]
        v[k] = defaultValue(propSchema, item)
      }
    }
  }
  return v
}

export function defaultValue<T extends any>(schema: JSONSchema, value: T | null): T | null {
  if (value === undefined) {
    value = null
  }

  if (value == null && schema.default !== undefined) {
    value = schema.default as T
  }

  switch (schema.type) {
    case 'object':
      return objectDefaultValue(schema, <JSONObject>value) as T

    case 'array':
      return (value || []) as T
  }

  return value
}

export function normalizeObject(value: JSONObject, isRoot = true): JSONObject | null {
  const obj: JSONObject = {}
  for (const k in value) {
    let v = value[k]
    v = typeDetect(v) === 'Object' ? normalizeObject(v as JSONObject, false) : v
    if (!(v === null || v === undefined)) {
      obj[k] = v
    }
  }
  return Object.keys(obj).length ? obj : isRoot ? {} : null
}

export function normalizeValue(value: any): any {
  return typeDetect(value) === 'Object' ? normalizeObject(value as JSONObject) : value
}

export function getComponent(
  schema: SvelteSchema,
  components: FormComponents
): typeof SvelteComponent {
  if (typeof schema.type !== 'string') {
    throw new Error(`Type "${schema.type}" is not supported`)
  }

  return (schema.$svelte && schema.$svelte.component) || components.fields[schema.type]
}

export function getComponentProps(schema: SvelteSchema): Props {
  return (schema.$svelte && schema.$svelte.props) || {}
}
