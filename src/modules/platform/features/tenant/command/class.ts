import { TenantSchemaType } from './schema';

export class TenantClass {
  self = this as TenantSchemaType;
  // methods, statics and getters and setters will be added on need basis
  someMethod() {
    return 1;
  }
  someMethod2() {
    return 1;
  }
  static someStatic() {
    return 1;
  }
  static someStatic2() {
    return 1;
  }

  get someVirtual() {
    return 1;
  }
  get someVirtual2() {
    return 1;
  }
}
