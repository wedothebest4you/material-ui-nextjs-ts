import { SortOrder } from 'mongoose';
import {
  HydratedDocument,
  Model,
  MongooseQueryOrDocumentMiddleware,
  QueryWithHelpers,
} from 'mongoose';
import { never } from 'zod';

// 1. Core structural filter types
type ExtractMethods<T> = {
  [K in keyof T as K extends
    | `onPre${string}`
    | `onPost${string}`
    | `${string}Validator`
    | `by${string}`
    ? never
    : T[K] extends (...args: any[]) => any
      ? K
      : never]: T[K];
};

type ExtractQueryHelpers<T> = {
  [K in keyof T as K extends `by${string}`
    ? T[K] extends (...args: any[]) => any
      ? K
      : never
    : never]: T[K];
};

type ExtractVirtuals<T, Blacklist extends string = never> = {
  [K in keyof T as K extends 'self' | Blacklist
    ? never
    : T[K] extends (...args: any[]) => any
      ? never
      : K]: T[K];
};

/**
 * Packs your ES6 Class constructor type cleanly into Mongoose's 4 model generics.
 * @template RawDoc - The shape of the raw database document data.
 * @template ClassConstructor - The constructor type of your class (e.g. typeof MyClass).
 * @template BlacklistKeys - Optional union of string keys to strip from virtuals.
 */

export type MakeModel<
  RawDoc,
  ClassConstructor extends abstract new (...args: any[]) => any,
  BlacklistKeys extends string = never,
> = Model<
  RawDoc,
  ExtractQueryHelpers<InstanceType<ClassConstructor>>,
  ExtractMethods<InstanceType<ClassConstructor>>,
  ExtractVirtuals<InstanceType<ClassConstructor>, BlacklistKeys>
> &
  ClassConstructor; // Combine directly with the constructor type for static methods!

export type MakeHydratedDocument<
  RawDoc,
  ClassConstructor extends abstract new (...args: any[]) => any,
> = HydratedDocument<
  RawDoc,
  ExtractMethods<InstanceType<ClassConstructor>>,
  {},
  ExtractVirtuals<InstanceType<ClassConstructor>>
>;

export type MakeQueryWithHelpersFind<
  RawDoc,
  ClassConstructor extends abstract new (...args: any[]) => any,
> = QueryWithHelpers<
  MakeHydratedDocument<RawDoc, ClassConstructor>[],
  MakeHydratedDocument<RawDoc, ClassConstructor>,
  ExtractQueryHelpers<InstanceType<ClassConstructor>>
>;

export type MakeQueryWithHelpersFindOne<
  RawDoc,
  ClassConstructor extends abstract new (...args: any[]) => any,
> = QueryWithHelpers<
  MakeHydratedDocument<RawDoc, ClassConstructor> | null,
  MakeHydratedDocument<RawDoc, ClassConstructor>,
  ExtractQueryHelpers<InstanceType<ClassConstructor>>
>;

export interface ClassConstructorValidHooksOnly {
  new (...args: any[]): any;
  prototype: ValidateClassHooks<InstanceType<ClassConstructorValidHooksOnly>>; // 🎯 Evaluates type validity natively
  [key: string]: any;
}

type ValidateClassHooks<T> = {
  [K in keyof T]: K extends string
    ? K extends `onPre${string}` | `onPost${string}`
      ? ExtractMiddlewareEvent<K> extends never
        ? '❌ Invalid Mongoose Lifecycle Event Name'
        : T[K]
      : T[K]
    : T[K];
};

export type ExtractMiddlewareEvent<T extends string> = T extends
  | `onPre${infer Event}`
  | `onPost${infer Event}`
  ? Lowercase<Event> extends MongooseQueryOrDocumentMiddleware
    ? Lowercase<Event>
    : never
  : never;

export type OverrideType<Doc, Key extends keyof Doc, T> = {
  [K in keyof Doc]: K extends Key ? T : Doc[K];
};

export type SchemaSortDocument<T> = Partial<
  Record<Extract<keyof T, string>, SortOrder>
>;

export type FieldOperator<T> = {
  $eq?: T;
  $ne?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $in?: T[];
};

export type SchemaFilterQuery<T> = {
  [K in keyof T]?: T[K] | FieldOperator<T[K]>;
};

export type SchemaProjection<T> = Partial<
  Record<keyof T, 1 | 0 | true | false>
>;
