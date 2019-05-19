import { JSONSchema7, JSONSchema7Type, JSONSchema7Array } from 'json-schema'
import { ErrorObject } from 'ajv'

export interface JSONSchema extends JSONSchema7 {}
export interface JSONSchemaArray extends JSONSchema7Array {}

export type JSONSchemaType = JSONSchema7Type
export type JSONObject = Record<string, JSONSchemaType>

export interface SvelteComponent {}

export interface FieldComponents {
  wrapper: SvelteComponent
  boolean: SvelteComponent
  null: SvelteComponent
  integer: SvelteComponent
  number: SvelteComponent
  string: SvelteComponent
  array: SvelteComponent
  object: SvelteComponent
}

export interface FieldProps<T extends JSONSchemaType> {
  value: T | null
  error: ErrorObject | null
  schema?: JSONSchema
  components?: FieldComponents
}

export interface FormComponents extends FieldComponents {
  layout: SvelteComponent
}

export interface FormProps<T extends JSONSchemaType> {
  data: T
  schema: JSONSchema
  components: FormComponents
}
