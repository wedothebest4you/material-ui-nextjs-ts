import { TenantSchemaType } from './schema';
import { HydratedDocument } from 'mongoose';
import TENANT from '../constants';

type TenantDocument = HydratedDocument<TenantSchemaType>;

export class TenantClass {
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

  async onPreValidate(this: TenantDocument) {
    if (this.isModified('plan')) {
      const validationError = this.validateSync('plan');
      if (validationError && validationError.errors['plan']) {
        throw validationError.errors['plan'];
      }

      this.userLimit =
        TENANT.userLimit.enum[
          TENANT.plan.enum.findIndex((i) => i === this.plan)
        ];
    }
  }
}
