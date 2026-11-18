import { Schema, MongooseQueryOrDocumentMiddleware } from 'mongoose';
import type { ClassConstructorValidHooksOnly } from '../mongoose/mongoose-utils.js';

/**
 * Custom alternative to Mongoose's native loadClass.
 * Reads configurations from SourceClass and populates the schema.
 */
export default function loadClassCustom(
  SourceClass: ClassConstructorValidHooksOnly,
  schema: Schema,
): void {
  //. Reset previously loaded

  // 1. Process Static Methods from the Source Class
  Object.getOwnPropertyNames(SourceClass).forEach((staticName) => {
    if (['length', 'prototype', 'name'].includes(staticName)) return;

    const staticField = SourceClass[staticName];
    if (typeof staticField === 'function') {
      schema.static(staticName, staticField);
    }
  });

  // 2. Process Prototype Methods (Instance Methods & Tagged Middleware)
  const prototype = SourceClass.prototype;

  Object.getOwnPropertyNames(prototype).forEach((methodName) => {
    if (methodName === 'constructor') return;
    if (typeof prototype[methodName] !== 'function') return;

    // Detect our custom Middleware Tag Protocol (e.g., onPreValidate)
    const middlewareMatch = methodName.match(
      /^(onPre|onPost)([A-Z][a-zA-Z]*)$/,
    );

    if (middlewareMatch) {
      const hookType = middlewareMatch[1] === 'onPre' ? 'pre' : 'post';

      const eventName =
        middlewareMatch[2].toLowerCase() as MongooseQueryOrDocumentMiddleware;

      if (hookType === 'pre') {
        schema.pre(eventName, prototype[methodName]);
      } else {
        schema.post(eventName, prototype[methodName]);
      }
      // delete prototype[methodName];
    } else if (methodName.endsWith('Validator')) {
      const pathName = methodName.replace('Validator', '');
      if (schema.path(pathName)) {
        let result = { isValid: false, message: '' };
        schema.path(pathName).validate({
          validator: async function (value) {
            const customValidation = prototype[methodName];
            result = await customValidation.call(this, value);
            schema.path(pathName).validators[
              schema.path(pathName).validators.length - 1
            ]['message'] = result.message;
            return result.isValid;
          },
          message: result.message,
        });

        //   schema.path(pathName).validate({
        //     validator: prototype[methodName],
        //     message: `Validation failed for the path ${pathName}`,
        //   });
      }
      // console.log(schema.path(pathName));
      // console.log('load class - test 8');
      // delete prototype[methodName];
    } else {
      // Standard methods are registered cleanly as native instance methods
      schema.method(methodName, prototype[methodName]);
    }
  });
}
