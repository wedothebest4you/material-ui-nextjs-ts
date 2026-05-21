import { Model } from 'mongoose';

// 1. Core structural filter types
type ExtractMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
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
  {}, // Query helpers (leave empty or pass a separate type if needed)
  ExtractMethods<InstanceType<ClassConstructor>>,
  ExtractVirtuals<InstanceType<ClassConstructor>, BlacklistKeys>
> &
  ClassConstructor; // Combine directly with the constructor type for static methods!
