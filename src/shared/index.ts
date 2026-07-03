import { GridLegacy } from '@mui/material';
import { setPrototypeFix } from './jsquirks/subclass-built-in-class';

export { default as createCommandSchema } from './mongoose/createCommandSchema';
export { default as createQuerySchema } from './mongoose/createQuerySchema';
export type { MakeModel as MakeModel } from './mongoose/mongoose-utils';
export type { MakeQueryWithHelpersFind as MakeQueryWithHelpersFind } from './mongoose/mongoose-utils';
export type { MakeQueryWithHelpersFindOne as MakeQueryWithHelpersFindOne } from './mongoose/mongoose-utils';
export type { MakeHydratedDocument as MakeHydratedDocument } from './mongoose/mongoose-utils';
export type { OverrideType as OverrideType } from './mongoose/mongoose-utils';

export type { SchemaSortDocument as SchemaSortDocument } from './mongoose/mongoose-utils';
export type { FieldOperator as FieldOperator } from './mongoose/mongoose-utils';
export type { SchemaFilterQuery as SchemaFilterQuery } from './mongoose/mongoose-utils';
export type { SchemaProjection as SchemaProjection } from './mongoose/mongoose-utils';
export { default as CommandBase } from './mongoose/command-base-class';
export { default as QueryBase } from './mongoose/query-base-class';

export { default as loadClassCustom } from './mongoose/loadClassCustom';
export type { ActionState as ActionState } from './types/index';

export type { ModuleDefinition as ModuleDefinition } from './types/index';
export type { RouteNode as RouteNode } from './types/index';
export { default as Grid } from '@mui/material/GridLegacy';
// export { default as getDbByMongoDbClient } from './db/mongo-db-client';
export { secureNumber, secureString } from './zod/uilts';
export { default as RequestValidationError } from './errors/request-validation-error';
export { default as DatabaseConnectionError } from './errors/database-connection-error';
export { default as SchemaOperationError } from './errors/schema-operation-error';
export { default as SchemaDatabseError } from './errors/schema-database-error';

export { setPrototypeFix as setPrototypeFix } from './jsquirks/subclass-built-in-class';
