import {
  MakeQueryWithHelpersFind,
  MakeQueryWithHelpersFindOne,
  MakeHydratedDocument,
  OverrideType,
  SchemaSortDocument,
  FieldOperator,
  SchemaFilterQuery,
  SchemaProjection,
  CommandBase,
} from '@/src/shared';

import TENANT from '../constants';
import Tenant from './model';
import { TenantSchemaType } from './schema';
import { TenantDTO } from './dto';

type TenantModel = typeof Tenant;

type TenantDocument = MakeHydratedDocument<
  TenantSchemaType,
  typeof TenantClass
>;

type TenantQueryWithHelpersFind = MakeQueryWithHelpersFind<
  TenantSchemaType,
  typeof TenantClass
>;
type TenantQueryWithHelpersFindOne = MakeQueryWithHelpersFindOne<
  TenantSchemaType,
  typeof TenantClass
>;

export class TenantClass extends CommandBase {
  async saveTenant(this: TenantDocument) {
    await this.save();
  }

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

  get userLimit(): number {
    const self = this as TenantDocument;
    return this.userLimit;
  }

  set userLimit(plan: string) {
    //ToDo: typing issue, temporarily handling by the utility OverrideType
    const self = this as TenantDocument;
    self.userLimit = TENANT.plan.enum.value.findIndex((i) => i === plan);
  }

  async onPreValidate(this: OverrideType<TenantDocument, 'userLimit', string>) {
    if (this.isModified('plan')) {
      const validationError = this.validateSync('plan');
      if (validationError && validationError.errors['plan']) {
        throw validationError.errors['plan'];
      }
      this.userLimit = this.plan;
    }
  }

  static async createOrUpdateTenant(this: TenantModel, tenant: TenantDTO) {
    if (!tenant.id) {
      await this.createTenant(tenant);
    } else {
      await this.updateTenant(tenant);
    }
  }

  static async createTenant(this: TenantModel, tenant: TenantDTO) {
    const doc = new Tenant(tenant);
    doc.loadDTO(tenant);
    return await doc.saveTenant();
  }

  static async updateTenant(this: TenantModel, tenant: TenantDTO) {
    const doc = await Tenant.find()
      .byTenantId(tenant.id)
      .byNotFound(`tenandtId = ${tenant.id}`);
    doc.loadDTO(tenant);
    doc.saveTenant();
  }

  byTenantId(this: TenantQueryWithHelpersFind, id: string) {
    const doc = this.findById({ id });
    return doc;
  }

  async byNotFound(this: TenantQueryWithHelpersFindOne, queryName: string) {
    const doc = await this.exec();
    if (!doc) {
      throw TenantClass.customError.createCustomError(
        500,
        'Retrieval failed',
        `Retrieval failed for the query : ${queryName}`,
      );
    }
    return doc;
  }

  loadDTO(this: TenantDocument, dto: TenantDTO) {
    this.name = dto.name;
    this.code = dto.code;
    this.plan = dto.plan;
    this.status = dto.status;
  }
}
