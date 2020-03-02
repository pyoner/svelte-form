import Ajv, { ErrorObject } from 'ajv'

import { lensPath, over, append } from 'ramda'

export const options = {
  schemaId: 'auto',
  jsonPointers: true,
  allErrors: true
}

export function createAjvValidator(ajv: Ajv.Ajv): Validator {
  return (schema: JSONSchema, data: JSONSchemaType) => {
    const valid = ajv.validate(schema, data) as boolean
    if (!valid) {
      return errorsToMap(ajv.errors as Ajv.ErrorObject[])
    }
    return null
  }
}

export function errorsToMap(errors: ErrorObject[]): ErrorRecord {
  const errorMap: ErrorRecord = {}
  return errors
    .map((error): [string[], ErrorObject] => {
      const path = error.dataPath ? error.dataPath.replace(/^\//, '').split('/') : []
      const propName =
        error.keyword === 'required' ? (<Ajv.RequiredParams>error.params).missingProperty : ''
      if (propName) {
        path.push(propName)
      }
      return [path, error]
    })
    .reduce((acc, [path, error]) => {
      const lens = lensPath(path)
      return over(lens, (list = []) => append(error, list), acc)
    }, errorMap)
}
