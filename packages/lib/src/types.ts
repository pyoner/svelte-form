import { SvelteComponent } from "svelte";
import type { JSONSchema } from "@pyoner/svelte-form-common";

export interface FieldComponents {
  boolean: SvelteComponentProps;
  null: SvelteComponentProps;
  integer: SvelteComponentProps;
  number: SvelteComponentProps;
  string: SvelteComponentProps;
  array: SvelteComponentProps;
  object: SvelteComponentProps;
}

export interface FieldProps<T extends any, E extends Errors = Error[]> {
  value: T | null;
  errors: E | null;
  schema?: SvelteSchema;
  components?: FormComponents;
  props?: Props;
}

export type Props = Record<string, any>;

export type SvelteComponentProps = typeof SvelteComponent | [typeof SvelteComponent, Props];

export interface FormComponents {
  layout: SvelteComponentProps;
  wrapper: SvelteComponentProps;
  form: SvelteComponentProps;
  itemWrapper: SvelteComponentProps;
  itemCtrl: SvelteComponentProps;
  fields: FieldComponents;
}

export interface FormProps<T extends any> {
  value: T;
  schema: SvelteSchema;
  components: FormComponents;
  validator: Validator;
}

export interface ErrorRecord {
  [k: string]: Error[] | ErrorRecord;
}

export type Errors = ErrorRecord | Error[];

export type FuncProps = (props: Props) => Props;
export type FuncComponent = (component: typeof SvelteComponent) => typeof SvelteComponent;

export type SvelteSchemaKeys =
  | "field"
  | "wrapper"
  | "ctrl"
  | "itemWrapper"
  | "itemCtrl"
  | "itemForm";

export interface SvelteSchema extends JSONSchema {
  $svelte?: {
    [P in SvelteSchemaKeys]: {
      component?: typeof SvelteComponent | FuncComponent;
      props?: Props | FuncProps;
    };
  };
}

export type Validator = (schema: JSONSchema, data: any) => Errors | null;
