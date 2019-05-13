import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { ErrorObject } from 'ajv'

export interface SvelteComponent {}

export interface Components {
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
  value?: T
  error?: ErrorObject
  schema?: JSONSchema7
  components?: Components
}
