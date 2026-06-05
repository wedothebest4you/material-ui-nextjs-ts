import { SchemaOperationError } from '@/src/shared';
import { HydratedDocument } from 'mongoose';
import { TenantSchemaType } from './schema';
import TENANT from '../constants';
import EntityBase from './entity-base';

type TenantDocument = HydratedDocument<TenantSchemaType, typeof TenantClass>;

export class TenantClass extends EntityBase {
  async nameValidator(
    this: TenantDocument,
    value: string,
  ): Promise<{
    isValid: boolean;
    message?: string;
  }> {
    // If the name hasn't been changed, skip the DB query entirely for performance
    if (!this.isNew && !this.isModified('name')) {
      return Promise.resolve({
        isValid: true,
      });
    }
    // Use a case-insensitive regular expression for an exact match anchor
    const caseInsensitiveName = new RegExp(`^${value}$`, 'i');
    // Query the database looking for a duplicate name

    const existingDocs = await this.model(this.constructor.name)
      .find({
        name: caseInsensitiveName,
      })
      .select('_id') // Optimize query performance by returning only the ID
      .lean(); // Skip Mongoose hydration overhead

    if (existingDocs.length > 1 || existingDocs[0]?._id !== this._id) {
      return Promise.resolve({
        isValid: false,
        message:
          '{VALUE} is in use for an existing Tenant, please try another name',
      });
    }
    return Promise.resolve({
      isValid: true,
    });
  }

  async codeValidator(
    this: TenantDocument,
    value: string,
  ): Promise<{
    isValid: boolean;
    message?: string;
  }> {
    if (!this.isNew && !this.isModified('code')) {
      return Promise.resolve({
        isValid: true,
      });
    }

    const existingDocs = await this.model(this.constructor.name)
      .find({
        code: value,
      })
      .select('_id') // Optimize query performance by returning only the ID
      .lean(); // Skip Mongoose hydration overhead

    if (existingDocs.length > 1 || existingDocs[0]?._id !== this._id) {
      return Promise.resolve({
        isValid: false,
        message:
          '{VALUE} is in use for an existing Tenant, please try another code',
      });
    }
    return Promise.resolve({
      isValid: true,
    });
  }

  set userLimit(plan: string) {
    const self = this as TenantSchemaType;
    self.userLimit =
      TENANT.userLimit.enum.value[
        TENANT.plan.enum.value.findIndex((i) => i === plan)
      ];
  }

  async onPreValidate(
    this: HydratedDocument<TenantSchemaType, InstanceType<typeof TenantClass>>,
  ) {
    if (this.isModified('plan')) {
      const validationError = this.validateSync('plan');
      if (validationError && validationError.errors['plan']) {
        throw validationError.errors['plan'];
      }
      this.userLimit = this.plan;
    }
  }

  // async onPostSave(error: Error, doc: TenantDocument, next: any) {
  //   next(new SchemaOperationError(error, next));
  // }
}
