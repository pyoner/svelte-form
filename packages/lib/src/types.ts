import { JSONSchema7, JSONSchema7Type, JSONSchema7Array } from 'json-schema'
import { ErrorObject } from 'ajv'
import { SvelteComponent } from 'svelte'

export interface JSONSchema extends JSONSchema7 {}
export interface JSONSchemaArray extends JSONSchema7Array {}

export type JSONSchemaType = JSONSchema7Type
export type JSONObject = Record<string, JSONSchemaType>

export interface FieldComponents {
  boolean: typeof SvelteComponent
  null: typeof SvelteComponent
  integer: typeof SvelteComponent
  number: typeof SvelteComponent
  string: typeof SvelteComponent
  array: typeof SvelteComponent
  object: typeof SvelteComponent
}

export interface FieldProps<T extends JSONSchemaType, E extends Errors = ErrorObject[]> {
  value: T | null
  errors: E | null
  schema?: JSONSchema
  components?: FieldComponents
}

export interface FormComponents extends FieldComponents {
  layout: typeof SvelteComponent
  wrapper: typeof SvelteComponent
}

export interface FormProps<T extends JSONSchemaType> {
  data: T
  schema: JSONSchema
  components: FormComponents
}

export interface ErrorRecord {
  [k: string]: ErrorObject[] | ErrorRecord
}

export type Errors = ErrorRecord | ErrorObject[]
