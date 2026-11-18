import Tenant from './model';
import { TenantDTO, tenantDTO, TenantKeys } from './zod_schema';
import { TenantSchemaType } from './mg_schema';
import { type ActionState } from '@/src/shared';
import mongoose from 'mongoose';

// import ServiceBase from '@/src/shared/mongoose/service-base-class';

// export default class TenantService extends ServiceBase {
export default class TenantService {
  static async createOrUpdateTenant(
    tenantInput: unknown,
  ): Promise<ActionState<TenantKeys>> {
    // if (!(tenant instanceof FormData)) {
    //   throw ServiceBase.customError.createCustomError(
    //     400,
    //     'Invalid input',
    //     'The form input conatains invalid data',
    //   );
    //   // throw Error('Invalid formData');
    // }
    // const rawData = Object.fromEntries(tenant.entries());
    const cleanData = tenantDTO.safeParse(tenantInput);
    // console.log(`service composer ${cleanData.success}`);

    if (!cleanData.success) {
      const fieldErrors: Partial<Record<TenantKeys, string>> = {};
      for (const issue of cleanData.error.issues) {
        const name = issue.path[0] as TenantKeys;
        fieldErrors[name] = issue.message;
      }
      // console.log(fieldErrors);
      return { status: 'error', fieldErrors };
    }

    try {
      const doc = await Tenant.createOrUpdateTenant(cleanData.data);
      // const doc = await new Tenant(cleanData.data).save();

      // console.log(`doc ${doc} ${doc.collection.name}`);
      return { status: 'success' };
    } catch (err) {
      const fieldErrors: Partial<Record<TenantKeys, string>> = {};
      // console.log(`err ${JSON.stringify(err)}`);
      if (err instanceof mongoose.Error.ValidationError) {
        // console.log(`instanceOf checked passed `);
        for (const [path, issue] of Object.entries(err.errors)) {
          // console.log(`iteration happens, path & issue ${path} ${issue}`);
          // if (
          //   issue instanceof mongoose.Error.ValidatorError ||
          //   issue instanceof mongoose.Error.CastError
          // ) {
          fieldErrors[path as TenantKeys] = issue.message;
          // } else {
          //   errMsg.push(`${err.name} : ${err.message}`);
          // }
        }
        // console.log(`fieldErrors : ${JSON.stringify(fieldErrors)}`);
        return {
          status: 'error',
          message: err.message,
          fieldErrors: fieldErrors,
        };
      }
      if (err instanceof Error) {
        return { status: 'error', message: `${err.name} : ${err.message}` };
      }
      return { status: 'error', message: `Some unkown error occured` };
    }
  }
}
