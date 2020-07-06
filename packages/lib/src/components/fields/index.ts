import type { FieldComponents } from "../../types";

import BooleanField from "./BooleanField.svelte";
import NullField from "./NullField.svelte";
import NumberField from "./NumberField.svelte";
import StringField from "./StringField.svelte";
import ObjectField from "./ObjectField.svelte";
import ArrayField from "./ArrayField.svelte";

export const defaultFieldComponents: FieldComponents = {
  boolean: BooleanField,
  null: NullField,
  number: NumberField,
  integer: [NumberField, { step: 1 }],
  string: StringField,
  object: ObjectField,
  array: ArrayField,
};

export { BooleanField, NullField, NumberField, StringField, ObjectField, ArrayField };
