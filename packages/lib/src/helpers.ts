import { isObject } from "is-what";
import { SvelteComponent } from "svelte";

import type { JSONObject, JSONSchema } from "@pyoner/svelte-form-common";

import type {
  FieldProps,
  Errors,
  FormComponents,
  Props,
  SvelteSchema,
  TSvelteComponent,
} from "./types";

export function createProps<T extends any, E extends Errors = Error[]>(
  value: T | null = null
): FieldProps<T, E> {
  const props: FieldProps<T, E> = {
    value,
    errors: null,
  };

  return props;
}

export function objectDefaultValue(schema: JSONSchema, value: JSONObject | null): JSONObject {
  const v: JSONObject = {};
  const { properties } = schema;
  if (properties) {
    for (let k in properties) {
      const propSchema = properties[k];

      if (typeof propSchema !== "boolean") {
        const item = value && value[k];
        v[k] = defaultValue(propSchema, item);
      }
    }
  }
  return v;
}

export function defaultValue<T extends any>(schema: JSONSchema, value: T | null): T | null {
  if (value === undefined) {
    value = null;
  }

  if (value == null && schema.default !== undefined) {
    value = schema.default as T;
  }

  switch (schema.type) {
    case "object":
      return objectDefaultValue(schema, <JSONObject>value) as T;

    case "array":
      return (value || []) as T;
  }

  return value;
}

export function normalizeObject(value: JSONObject, isRoot = true): JSONObject | null {
  const obj: JSONObject = {};
  for (const k in value) {
    let v = value[k];
    v = isObject(v) ? normalizeObject(v as JSONObject, false) : v;
    if (!(v === null || v === undefined)) {
      obj[k] = v;
    }
  }
  return Object.keys(obj).length ? obj : isRoot ? {} : null;
}

export function normalizeValue(value: any): any {
  return isObject(value) ? normalizeObject(value as JSONObject) : value;
}

export function getSchemaComponent(
  schema: SvelteSchema,
  components: FormComponents
): typeof SvelteComponent {
  if (typeof schema.type !== "string") {
    throw new Error(`Type "${schema.type}" is not supported`);
  }

  return (
    (schema.$svelte && schema.$svelte.component) || getComponent(components.fields[schema.type])
  );
}

export function getSchemaComponentProps(schema: SvelteSchema, components: FormComponents): Props {
  if (typeof schema.type !== "string") {
    throw new Error(`Type "${schema.type}" is not supported`);
  }

  return (
    (schema.$svelte && schema.$svelte.props) || getComponentProps(components.fields[schema.type])
  );
}

export function getComponent(container: TSvelteComponent): typeof SvelteComponent {
  return Array.isArray(container) ? container[0] : container;
}

export function getComponentProps(container: TSvelteComponent): Props {
  return Array.isArray(container) ? container[1] : {};
}
