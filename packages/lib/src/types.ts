import { SvelteComponent } from 'svelte'
import { JSONSchema } from '@pyoner/svelte-form-common'

export interface FieldComponents {
  boolean: typeof SvelteComponent
  null: typeof SvelteComponent
  integer: typeof SvelteComponent
  number: typeof SvelteComponent
  string: typeof SvelteComponent
  array: typeof SvelteComponent
  object: typeof SvelteComponent
}

export interface FieldProps<T extends any, E extends Errors = Error[]> {
  value: T | null
  errors: E | null
  schema?: SvelteSchema
  components?: FormComponents
  props?: Props
}

export type Props = Record<string, any>

export type TSvelteComponent = typeof SvelteComponent | [typeof SvelteComponent, Props]

export interface FormComponents {
  layout: TSvelteComponent
  wrapper: TSvelteComponent
  form: TSvelteComponent
  fields: FieldComponents
}

export interface FormProps<T extends any> {
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

export type Validator = (schema: JSONSchema, data: any) => Errors | null
