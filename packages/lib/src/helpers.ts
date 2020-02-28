import typeDetect from 'type-detect'
import Ajv, { ErrorObject } from 'ajv'
import jsonSchemaDraft4 from 'ajv/lib/refs/json-schema-draft-04.json'
import { SvelteComponent } from 'svelte'
import { lensPath, over, append } from 'ramda'

import {
  FieldProps,
  JSONObject,
  JSONSchema,
  JSONSchemaType,
  ErrorRecord,
  Errors,
  FormComponents,
  Props,
  SvelteSchema
} from './types'

export function createProps<T extends JSONSchemaType, E extends Errors = Error[]>(
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

export function defaultValue<T extends JSONSchemaType>(
  schema: JSONSchema,
  value: T | null
): T | null {
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

export function normalizeValue(value: JSONSchemaType): JSONSchemaType {
  return typeDetect(value) === 'Object' ? normalizeObject(value as JSONObject) : value
}

let ajv: Ajv.Ajv
export const options = {
  get ajv() {
    if (!ajv) {
      ajv = new Ajv({
        schemaId: 'auto',
        jsonPointers: true,
        allErrors: true
      })
      ajv.addMetaSchema(jsonSchemaDraft4)
    }
    return ajv
  }
}
export function validate(ajv: Ajv.Ajv, schema: JSONSchema, data: JSONSchemaType) {
  const valid = ajv.validate(schema, data) as boolean
  if (!valid) {
    return ajv.errors as Ajv.ErrorObject[]
  }
  return null
}

export function errorsToMap(errors: ErrorObject[]): ErrorRecord {
  const errorMap: ErrorRecord = {}
  return errors
    .map((error): [string[], ErrorObject] => {
      const path = error.dataPath ? error.dataPath.replace(/^\//, '').split('/') : []
      const propName =
        error.keyword === 'required' ? (<Ajv.RequiredParams>error.params).missingProperty : ''
      if (propName) {
        path.push(propName)
      }
      return [path, error]
    })
    .reduce((acc, [path, error]) => {
      const lens = lensPath(path)
      return over(lens, (list = []) => append(error, list), acc)
    }, errorMap)
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
