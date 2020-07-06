import type { JSONSchema } from "json-schema-typed";

export type { JSONSchema };

export const supportedTypes = ["array", "boolean", "null", "number", "integer", "object", "string"];

export type JSONObject = Record<string, any>;

export interface ErrorRecord {
  [k: string]: Error[] | ErrorRecord;
}

export type Errors = ErrorRecord | Error[];

export type Validator = (schema: JSONSchema, data: any) => Errors | null;
