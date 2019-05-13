import BooleanField from './BooleanField.svelte'
import NullField from './NullField.svelte'
import NumberField from './NumberField.svelte'
import StringField from './StringField.svelte'
import ObjectField from './ObjectField.svelte'
import ArrayField from './ArrayField.svelte'
import WrapperField from './WrapperField.svelte'

export const defaultComponents: Record<string, any> = {
  boolean: BooleanField,
  null: NullField,
  number: NumberField,
  integer: NumberField,
  string: StringField,
  object: ObjectField,
  array: ArrayField,
  wrapper: WrapperField
}
