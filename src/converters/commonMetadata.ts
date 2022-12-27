import { AnySchema } from "yup/lib/schema";
import { JSONSchema7 } from 'json-schema'

const commonMetadata = (shape : AnySchema, jsonSchema : JSONSchema7) : JSONSchema7 => {
  if (shape.spec.label)
    jsonSchema.description = shape.spec.label;
  if (shape.spec.meta?.description)
    jsonSchema.description = shape.spec.meta.description;
  if (shape.spec.meta?.example)
    jsonSchema.examples = [shape.spec.meta.example];
  if (shape.spec.meta?.examples)
    jsonSchema.examples = shape.spec.meta.examples;
  
  try {
    if (jsonSchema.type && jsonSchema.type !== 'object') {
      const value = shape.getDefault();
      if (typeof value !== 'undefined') {
        jsonSchema.default = value
      }
    }
  } catch (e) { /* empty */ }
  
  return jsonSchema
}

export default commonMetadata
