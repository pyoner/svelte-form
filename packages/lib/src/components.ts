import { FieldComponents } from './types'
import BooleanField from './fields/BooleanField.svelte'
import NullField from './fields/NullField.svelte'
import NumberField from './fields/NumberField.svelte'
import StringField from './fields/StringField.svelte'
import ObjectField from './fields/ObjectField.svelte'
import ArrayField from './fields/ArrayField.svelte'
import WrapperField from './fields/WrapperField.svelte'

export const defaultFieldComponents: FieldComponents = {
  boolean: BooleanField,
  null: NullField,
  number: NumberField,
  integer: NumberField,
  string: StringField,
  object: ObjectField,
  array: ArrayField,
  wrapper: WrapperField
}
