import { JSONSchema7, JSONSchema7Type, JSONSchema7Array } from 'json-schema'
import { SvelteComponent } from 'svelte'

export interface JSONSchema extends JSONSchema7 {}
export interface JSONSchemaArray extends JSONSchema7Array {}

export type JSONSchemaType = JSONSchema7Type
export type JSONObject = Record<string, JSONSchemaType>
export type JSONSchemaTypeName = 'array' | 'boolean' | 'null' | 'number' | 'object' | 'string'

export interface FieldComponents {
  boolean: typeof SvelteComponent
  null: typeof SvelteComponent
  integer: typeof SvelteComponent
  number: typeof SvelteComponent
  string: typeof SvelteComponent
  array: typeof SvelteComponent
  object: typeof SvelteComponent
}

export interface FieldProps<T extends JSONSchemaType, E extends Errors = Error[]> {
  value: T | null
  errors: E | null
  schema?: SvelteSchema
  components?: FormComponents
  props?: Props
}

export type Props = Record<string, any>

export interface FormComponents {
  layout: typeof SvelteComponent
  wrapper: typeof SvelteComponent
  form: typeof SvelteComponent
  fields: FieldComponents
}

export interface FormProps<T extends JSONSchemaType> {
  value: T
  schema: SvelteSchema
  components: FormComponents
  validator: Validator
}

export interface ErrorRecord {
  [k: string]: Error[] | ErrorRecord
}

export type Errors = ErrorRecord | Error[]

export interface SvelteSchema extends JSONSchema {
  $svelte?: {
    component?: typeof SvelteComponent
    props?: Props
  }
}

export const supportedTypes = ['array', 'boolean', 'null', 'number', 'object', 'string']

export type Validator = (schema: JSONSchema, data: JSONSchemaType) => Errors | null
