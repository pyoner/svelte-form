export interface Field {
  component: any
  props: Record<string, any>
}

export interface Fields {
  byPath: Record<string, Field>
  byType: Record<string, Field>
}

export interface FormOptions {
  wrapper: any
  fields: Fields
}
