import { isObject, isFunction } from "is-what";
import { SvelteComponent } from "svelte";

import type { JSONObject, JSONSchema } from "@pyoner/svelte-form-common";

import type {
  FieldProps,
  Errors,
  Props,
  SvelteComponentProps,
  SvelteSchema,
  SvelteSchemaKeys,
  FuncProps,
  FuncComponent,
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

export function getComponentFromSchema(
  schema: SvelteSchema,
  key: SvelteSchemaKeys
): typeof SvelteComponent | FuncComponent | undefined {
  const obj = schema.$svelte && schema.$svelte[key];

  if (obj?.component) {
    return obj.component;
  }
}

export function getPropsFromSchema(
  schema: SvelteSchema,
  key: SvelteSchemaKeys
): Props | FuncProps | undefined {
  const obj = schema.$svelte && schema.$svelte[key];

  if (obj?.props) {
    return obj.props;
  }
}

export function getComponentFromContainer(container: SvelteComponentProps): typeof SvelteComponent {
  return Array.isArray(container) ? container[0] : container;
}

export function getPropsFromContainer(container: SvelteComponentProps): Props {
  return Array.isArray(container) ? container[1] : {};
}

export function getProps(
  schema: SvelteSchema,
  container: SvelteComponentProps,
  key: SvelteSchemaKeys
): Props {
  const component = getComponentFromSchema(schema, key);

  const props = getPropsFromSchema(schema, key);
  if (props) {
    return props;
  }

  if (component) {
    return {};
  }

  return getPropsFromContainer(container);
}

export function getComponent(
  schema: SvelteSchema,
  container: SvelteComponentProps,
  key: SvelteSchemaKeys
): typeof SvelteComponent {
  const defaultComponent = getComponentFromContainer(container);
  const component = getComponentFromSchema(schema, key);

  if (component) {
    if (isFunction(component)) {
      return (component as FuncComponent)(defaultComponent);
    }
    return component;
  }

  return defaultComponent;
}
