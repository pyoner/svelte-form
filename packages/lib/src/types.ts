import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { ErrorObject } from 'ajv'

export type JSONObject = Record<string, JSONSchema7Type>

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

export interface FieldProps<T extends JSONSchema7Type> {
  value: T | null
  error: ErrorObject | null
  schema?: JSONSchema7
  components?: FieldComponents
}

export interface FormComponents extends FieldComponents {
  layout: SvelteComponent
}

export interface FormProps<T extends JSONSchema7Type> {
  data: T
  schema: JSONSchema7
  components: FormComponents
}
