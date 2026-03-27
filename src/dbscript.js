// https://www.mongodb.com/docs/mongodb-shell/write-scripts/

/*

ToDos:
------------------------------------------------
1. How to embedd subdocunments for parent account
at present it is referenced.

2. The accounts schema will be populated by the
Account projection worker. It is based on the two
collections - Global event stream and Synch state.
Therefore all these are to be designed.

*/

const { connect } = require('http2');
const { unique } = require('next/dist/build/utils');
const PRD = true;

// Below is a MongoDB shell / mongosh script that:

// An example of the data collections
// Tenant: ABC Holdings
//    Organisation: India Division
//         Company Codes:
//             ABC Manufacturing Pvt Ltd
//             ABC Trading Pvt Ltd
//             ABC Services Pvt Ltd

if (!PRD) {
  // connecting to the ERP database runs on localhost:27017
  db = connect('mongodb://localhost/erp');
} else {
  //connect to the remote host
}

// Creates the tenants collection
// Creates the organizations collection
// ToDo : complete this listing
// Adds JSON schema validation
// Creates indexes
// Inserts sample collections

// No Mongoose is used — this is pure MongoDB collection design, which is the correct foundation for your ERP datastore.

// SECTION 1

// 1. Create tenants Collection

db.createCollection('tenants', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'code', 'createdAt'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Tenant name',
        },
        code: {
          bsonType: 'string',
          description: 'Unique tenant code',
        },
        plan: {
          bsonType: 'string',
          enum: ['basic', 'standard', 'enterprise'],
        },
        status: {
          bsonType: 'string',
          enum: ['active', 'inactive'],
        },
        createdAt: {
          bsonType: 'date',
        },
      },
    },
  },
});

// 2. Indexes for Tenants
db.tenants.createIndex({ code: 1 }, { unique: true, name: 'ux_tenant_code' });

db.tenants.createIndex({ name: 1 }, { unique: true, name: 'ix_tenant_name' });

// 3. Create organizations Collection
db.createCollection('organizations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['tenantId', 'name', 'code', 'createdAt', 'isSystemOrg'],
      properties: {
        tenantId: {
          bsonType: 'objectId',
          description: 'Tenant reference',
        },
        name: {
          bsonType: 'string',
        },
        code: {
          bsonType: 'string',
        },
        isSystemOrg: {
          bsonType: 'bool',
          description: 'Default organization created during tenant bootstrap',
        },
        status: {
          bsonType: 'string',
          enum: ['active', 'inactive'],
        },
        createdAt: {
          bsonType: 'date',
        },
      },
    },
  },
});

// 4. Organization Indexes

// Important ERP indexes.

// Tenant + Org Code (unique per tenant)
db.organizations.createIndex(
  { tenantId: 1, code: 1 },
  { unique: true, name: 'ux_org_tenant_code' },
);

db.organizations.createIndex(
  { tenantId: 1, name: 1 },
  { unique: true, name: 'ux_org_tenant_name' },
);

// Ensure Only One System Organization Per Tenant
// Use a partial unique index.

db.organizations.createIndex(
  { tenantId: 1, isSystemOrg: 1 },
  {
    unique: true,
    partialFilterExpression: { isSystemOrg: true },
    name: 'ux_one_system_org_per_tenant',
  },
);

// 5. Insert Tenants

// We will create three tenants.

const t1 = ObjectId();
const t2 = ObjectId();
const t3 = ObjectId();

db.tenants.insertMany([
  {
    _id: t1,
    name: 'Alpha Holdings',
    code: 'ALPHA',
    plan: 'enterprise',
    status: 'active',
    createdAt: new Date(),
  },
  {
    _id: t2,
    name: 'Beta Group',
    code: 'BETA',
    plan: 'standard',
    status: 'active',
    createdAt: new Date(),
  },
  {
    _id: t3,
    name: 'Gamma Corporation',
    code: 'GAMMA',
    plan: 'basic',
    status: 'active',
    createdAt: new Date(),
  },
]);
// 6. Insert Organizations

// Each tenant receives 3 organizations.

db.organizations.insertMany([
  /* ---------- Tenant 1 ---------- */

  {
    tenantId: t1,
    name: 'Alpha Manufacturing',
    code: 'ALPHA-MFG',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t1,
    name: 'Alpha Trading',
    code: 'ALPHA-TRD',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t1,
    name: 'Alpha Logistics',
    code: 'ALPHA-LOG',
    status: 'active',
    createdAt: new Date(),
  },

  /* ---------- Tenant 2 ---------- */

  {
    tenantId: t2,
    name: 'Beta Industries',
    code: 'BETA-IND',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t2,
    name: 'Beta Retail',
    code: 'BETA-RTL',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t2,
    name: 'Beta Distribution',
    code: 'BETA-DST',
    status: 'active',
    createdAt: new Date(),
  },

  /* ---------- Tenant 3 ---------- */

  {
    tenantId: t3,
    name: 'Gamma Manufacturing',
    code: 'GAMMA-MFG',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t3,
    name: 'Gamma Trading',
    code: 'GAMMA-TRD',
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t3,
    name: 'Gamma Services',
    code: 'GAMMA-SRV',
    status: 'active',
    createdAt: new Date(),
  },
]);

// SECTION 2

// 1. Create users Collection
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'organizationId',
        'email',
        'passwordHash',
        'role',
        'createdAt',
        'isSystemAdmin',
      ],
      properties: {
        tenantId: {
          bsonType: 'objectId',
          description: 'Tenant reference',
        },
        organizationId: {
          bsonType: 'objectId',
          description: 'Organization reference',
        },
        name: {
          bsonType: 'string',
        },
        email: {
          bsonType: 'string',
        },
        passwordHash: {
          bsonType: 'string',
        },
        role: {
          bsonType: 'string',
          enum: ['org_admin', 'manager', 'user'],
        },
        isSystemAdmin: {
          bsonType: 'bool',
          description: 'Admin created automatically during org bootstrap',
        },
        status: {
          bsonType: 'string',
          enum: ['active', 'inactive'],
        },
        createdAt: {
          bsonType: 'date',
        },
      },
    },
  },
});

// Users Indexes

// Unique email per organization
db.users.createIndex(
  { tenantId: 1, organizationId: 1, email: 1 },
  { unique: true, name: 'ux_user_org_email' },
);

// Tenant + Organization lookup
db.users.createIndex(
  { tenantId: 1, organizationId: 1 },
  { name: 'ix_user_tenant_org' },
);

// Only One System Admin Per Organization
// Use another partial unique index.

db.users.createIndex(
  { tenantId: 1, organizationId: 1, isSystemAdmin: 1 },
  {
    unique: true,
    partialFilterExpression: { isSystemAdmin: true },
    name: 'ux_one_system_admin_per_org',
  },
);

// Fetch Organization IDs

// Before inserting users, fetch organizations.

const orgs = db.organizations.find().toArray();

const o1 = orgs[0];
const o2 = orgs[1];
const o3 = orgs[2];
const o4 = orgs[3];
const o5 = orgs[4];
const o6 = orgs[5];
const o7 = orgs[6];
const o8 = orgs[7];
const o9 = orgs[8];

// Insert Admin Users for Each Organization

// Each organization must have one admin user.

db.users.insertMany([
  {
    tenantId: o1.tenantId,
    organizationId: o1._id,
    name: 'Admin Alpha Manufacturing',
    email: 'admin@alphamfg.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o2.tenantId,
    organizationId: o2._id,
    name: 'Admin Alpha Trading',
    email: 'admin@alphatrading.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o3.tenantId,
    organizationId: o3._id,
    name: 'Admin Alpha Logistics',
    email: 'admin@alphalogistics.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o4.tenantId,
    organizationId: o4._id,
    name: 'Admin Beta Industries',
    email: 'admin@betaind.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o5.tenantId,
    organizationId: o5._id,
    name: 'Admin Beta Retail',
    email: 'admin@betaretail.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o6.tenantId,
    organizationId: o6._id,
    name: 'Admin Beta Distribution',
    email: 'admin@betadist.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o7.tenantId,
    organizationId: o7._id,
    name: 'Admin Gamma Manufacturing',
    email: 'admin@gammamfg.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o8.tenantId,
    organizationId: o8._id,
    name: 'Admin Gamma Trading',
    email: 'admin@gammatrading.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },

  {
    tenantId: o9.tenantId,
    organizationId: o9._id,
    name: 'Admin Gamma Services',
    email: 'admin@gammaservices.com',
    passwordHash: 'hashed_password',
    role: 'org_admin',
    status: 'active',
    createdAt: new Date(),
  },
]);

// SECTION - 3

//1. Create accountTemplates Collection

db.createCollection('accountTemplates', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'organizationId',
        'code',
        'name',
        'type',
        'category',
        'level',
        'path',
        'createdAt',
        'updatedAt',
      ],
      properties: {
        tenantId: {
          bsonType: 'objectId',
          description: 'Tenant reference',
        },

        organizationId: {
          bsonType: 'objectId',
          description: 'Organization reference',
        },

        code: {
          bsonType: 'string',
          description: 'Account template code',
        },

        name: {
          bsonType: 'string',
          description: 'Account template name',
        },

        type: {
          bsonType: 'string',
          enum: ['group', 'ledger'],
          description: 'Group or Ledger',
        },
        category: {
          bsonType: 'string',
          enum: ['asset', 'liability', 'equity', 'income', 'expense'],
        },
        level: {
          bsonType: 'int',
          minimum: 0,
        },

        path: {
          bsonType: 'string',
          description: 'Materialized path for hierarchy',
        },

        parentId: {
          bsonType: ['objectId', 'null'],
        },

        createdAt: {
          bsonType: 'date',
        },
        updatedAt: {
          bsonType: 'date',
        },
      },
    },
  },
});

// Index Strategy
// No business queries are expected in this collection.

// ERP systems must support fast hierarchy traversal and code lookup.

// Unique Code (Ignore Deleted)

// Soft delete requires partial index.
// It is mandatory for the queries to include
// isDeleted in the query document, otherwise
// the partial index will go skipped resulting a full scan

db.accountTemplates.createIndex(
  { tenantId: 1, organizationId: 1, code: 1 },
  {
    unique: true,
    name: 'ux_template_code',
  },
);

db.accountTemplates.createIndex(
  { tenantId: 1, organizationId: 1, name: 1 },
  {
    unique: true,
    name: 'ux_template_name',
  },
);

// For sample inserts we assume:

const tenantId = t1;
const organizationId = o1;

// Insert Root Account Groups

// These represent the major accounting heads.

db.accountTemplates.insertMany([
  {
    tenantId,
    organizationId,
    code: '1000',
    name: 'Assets',
    type: 'group',
    category: 'asset',
    level: 0,
    path: '1000',
    parentId: null,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '2000',
    name: 'Liabilities',
    category: 'asset',
    type: 'group',
    level: 0,
    path: '2000',
    parentId: null,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '3000',
    name: 'Equity',
    type: 'group',
    category: 'equity',
    level: 0,
    path: '3000',
    parentId: null,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '4000',
    name: 'Revenue',
    category: 'income',
    type: 'group',
    level: 0,
    path: '4000',
    parentId: null,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '5000',
    name: 'Expenses',
    category: 'expense',
    type: 'group',
    level: 0,
    path: '5000',
    parentId: null,
    isSystem: true,
    createdAt: new Date(),
  },
]);

//  Insert Sub Groups

// Example under Assets.

// First fetch Assets id.

const assets = db.accountTemplates.findOne({ code: '1000' });

// Then insert children.

db.accountTemplates.insertMany([
  {
    tenantId,
    organizationId,
    code: '1100',
    name: 'Current Assets',
    type: 'group',
    level: 1,
    path: '1000/1100',
    parentId: assets._id,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '1200',
    name: 'Fixed Assets',
    type: 'group',
    level: 1,
    path: '1000/1200',
    parentId: assets._id,
    isSystem: true,
    createdAt: new Date(),
  },
]);

//  Insert Ledger Templates

// Example under Current Assets.

const currentAssets = db.accountTemplates.findOne({ code: '1100' });

db.accountTemplates.insertMany([
  {
    tenantId,
    organizationId,
    code: '1110',
    name: 'Cash',
    type: 'ledger',
    category: 'asset',
    level: 2,
    path: '1000/1100/1110',
    parentId: currentAssets._id,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '1120',
    name: 'Bank',
    type: 'ledger',
    level: 2,
    path: '1000/1100/1120',
    parentId: currentAssets._id,
    isSystem: true,
    createdAt: new Date(),
  },

  {
    tenantId,
    organizationId,
    code: '1130',
    name: 'Accounts Receivable',
    type: 'ledger',
    level: 2,
    path: '1000/1100/1130',
    parentId: currentAssets._id,
    isSystem: true,
    createdAt: new Date(),
  },
]);

// 1. Collection Design — companyCodes

db.createCollection('companyCodes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'orgId',
        'code',
        'name',
        'country',
        'currency',
        'fiscalYearStart',
        'createdAt',
      ],
      properties: {
        tenantId: {
          bsonType: 'objectId',
          description: 'Tenant owning this company code',
        },

        orgId: {
          bsonType: 'objectId',
          description: 'Organisation owning this company',
        },

        code: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 10,
          description: 'ERP company code',
        },

        name: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 200,
          description: 'Legal company name',
        },

        country: {
          bsonType: 'string',
          minLength: 2,
          maxLength: 100,
        },

        currency: {
          bsonType: 'string',
          minLength: 3,
          maxLength: 3,
          description: 'Base currency (ISO)',
        },

        fiscalYearStart: {
          bsonType: 'date',
        },

        isDeleted: {
          bsonType: 'bool',
        },

        deletedAt: {
          bsonType: ['date', 'null'],
        },

        createdAt: {
          bsonType: 'date',
        },

        updatedAt: {
          bsonType: ['date', 'null'],
        },
      },
    },
  },
});

// Index Strategy (ERP Optimized)
// Unique company code per organisation
db.companyCodes.createIndex(
  { tenantId: 1, orgId: 1, code: 1 },
  { unique: true, name: 'ux_companyCode_code' },
);
db.companyCodes.createIndex(
  { tenantId: 1, orgId: 1, name: 1 },
  { unique: true, name: 'ux_companyCode_name' },
);
// Organisation lookup
db.companyCodes.createIndex(
  { tenantId: 1, orgId: 1 },
  { name: 'ix_companyCode_tenant_org' },
);

// Sample Data Insert

// Example assumes some previously created tenants and organisations.

db.companyCodes.insertMany([
  {
    tenantId: tenantId,
    orgId: organizationId,
    code: 'C001',
    name: 'ABC Manufacturing Pvt Ltd',
    country: 'India',
    currency: 'INR',
    fiscalYearStart: new Date('2025-04-01'),
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    tenantId: tenantId,
    orgId: organizationId,
    code: 'C002',
    name: 'ABC Trading Pvt Ltd',
    country: 'India',
    currency: 'INR',
    fiscalYearStart: new Date('2025-04-01'),
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    tenantId: tenantId,
    orgId: organizationId,
    code: 'C001',
    name: 'Global Retail LLC',
    country: 'UAE',
    currency: 'AED',
    fiscalYearStart: new Date('2025-01-01'),
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
]);

const cCodeIdArray = db.companyCodes.find().toArray();

cCodeId = cCodeIdArray[0];

// Collection Design — fiscalPeriods

db.createCollection('fiscalPeriods', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'orgId',
        'companyCodeId',
        'fiscalYear',
        'period',
        'startDate',
        'endDate',
        'status',
        'createdAt',
      ],
      properties: {
        tenantId: {
          bsonType: 'objectId',
        },

        orgId: {
          bsonType: 'objectId',
        },

        companyCodeId: {
          bsonType: 'objectId',
        },

        fiscalYear: {
          bsonType: 'int',
          minimum: 2000,
          maximum: 2100,
        },

        period: {
          bsonType: 'int',
          minimum: 1,
          maximum: 12,
        },

        startDate: {
          bsonType: 'date',
        },

        endDate: {
          bsonType: 'date',
        },

        status: {
          enum: ['OPEN', 'CLOSED', 'LOCKED'],
        },

        isDeleted: {
          bsonType: 'bool',
        },

        deletedAt: {
          bsonType: ['date', 'null'],
        },

        createdAt: {
          bsonType: 'date',
        },

        updatedAt: {
          bsonType: ['date', 'null'],
        },
      },
    },
  },
});

// Index Strategy (ERP Grade)

db.fiscalPeriods.createIndex(
  { tenantId: 1, orgId: 1, companyCodeId: 1, fiscalYear: 1, period: 1 },
  { unique: true, name: 'ux_fiscalPeriod_period' },
);

db.fiscalPeriods.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    status: 1,
  },
  { name: 'ix_fiscalPeriod_status' },
);

db.fiscalPeriods.insertMany([
  {
    tenantId: tenantId,
    orgId: organizationId,
    companyCodeId: cCodeId,
    fiscalYear: 2025,
    period: 1,
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-04-30'),
    status: 'OPEN',
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
  },

  {
    tenantId: tenantId,
    orgId: organizationId,
    companyCodeId: cCodeId,
    fiscalYear: 2025,
    period: 2,
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-05-31'),
    status: 'OPEN',
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
  },

  {
    tenantId: tenantId,
    orgId: organizationId,
    companyCodeId: cCodeId,
    fiscalYear: 2025,
    period: 3,
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-06-30'),
    status: 'OPEN',
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
  },

  {
    tenantId: tenantId,
    orgId: organizationId,
    companyCodeId: cCodeId,
    fiscalYear: 2025,
    period: 4,
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-07-31'),
    status: 'OPEN',
    isDeleted: false,
    deletedAt: null,
    createdAt: new Date(),
  },
]);

// Collection Design — accounts

db.createCollection('accounts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['tenantId', 'orgId', 'companyCodeId'],
      properties: {
        tenantId: {
          bsonType: 'objectId',
        },

        orgId: {
          bsonType: 'objectId',
        },

        companyCodeId: {
          bsonType: 'objectId',
        },

        template: {
          bsonType: 'object',
          required: [
            'code',
            'name',
            'type',
            'category',
            'level',
            'path',
            'createdAt',
            'updatedAt',
          ],
          properties: {
            code: {
              bsonType: 'string',
              description: 'Account template code',
            },

            name: {
              bsonType: 'string',
              description: 'Account template name',
            },

            type: {
              bsonType: 'string',
              enum: ['group', 'ledger'],
              description: 'Group or Ledger',
            },
            category: {
              bsonType: 'string',
              enum: ['asset', 'liability', 'equity', 'income', 'expense'],
            },
            level: {
              bsonType: 'int',
              minimum: 0,
            },

            path: {
              bsonType: 'string',
              description: 'Materialized path for hierarchy',
            },

            parentId: {
              bsonType: ['objectId', 'null'],
            },

            createdAt: {
              bsonType: 'date',
            },
            updatedAt: {
              bsonType: 'date',
            },
          },
        },
      },
      allowPosting: {
        bsonType: 'bool',
      },
      costBreakup: {
        bsonType: 'bool',
      },
      hasSubledger: {
        bsonType: 'bool',
      },

      subledgerType: {
        bsonType: ['string', 'null'],
        enum: [
          'customer',
          'vendor',
          'employee',
          'bank',
          'inventory',
          'asset',
          null,
        ],
      },
    },
  },
});

// 3. Index Strategy (Very Important)

// Unique account code and name per company
db.accounts.createIndex(
  { tenantId: 1, orgId: 1, companyCodeId: 1, code: 1 },
  { unique: true, name: 'iu_accounts_code' },
);

db.accounts.createIndex(
  { tenantId: 1, orgId: 1, companyCodeId: 1, name: 1 },
  { unique: true, name: 'iu_accounts_name' },
);

// Hierarchy traversal
db.accounts.createIndex({
  tenantId: 1,
  orgId: 1,
  companyCodeId: 1,
  path: 1,
  name: 'ix_accounts_path',
});

// Parent lookup
db.accounts.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    parentId: 1,
  },
  { name: 'ix_accounts_parent' },
);

// Category queries
db.accounts.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    category: 1,
  },
  { name: 'ix_accounts_category' },
);

// Soft deletion
// No index seems to help here.

// Sub-Ledger
db.createCollection('subledgers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'orgId',
        'companyCode',
        'businessEntity',
        'isActive',
        'isDeleted',
        'createdAt',
      ],
      properties: {
        tenantId: { bsonType: 'objectId' },

        orgId: { bsonType: 'objectId' },

        companyCode: {
          bsonType: 'string',
        },

        businessEntity: {
          bsonType: 'object',
          required: ['code', 'name', 'type'],
          properties: {
            code: {
              bsonType: 'string',
              minLength: 1,
            },

            name: {
              bsonType: 'string',
              minLength: 1,
            },

            type: {
              bsonType: 'string',
              enum: [
                'customer',
                'vendor',
                'employee',
                'bank',
                'asset',
                'custom',
              ],
            },
          },
        },
        referenceAccountId: {
          bsonType: ['objectId', 'null'],
        },

        contact: {
          bsonType: 'object',
          properties: {
            email: { bsonType: ['string', 'null'] },
            phone: { bsonType: ['string', 'null'] },
          },
        },

        address: {
          bsonType: 'object',
          properties: {
            line1: { bsonType: ['string', 'null'] },
            line2: { bsonType: ['string', 'null'] },
            city: { bsonType: ['string', 'null'] },
            state: { bsonType: ['string', 'null'] },
            country: { bsonType: ['string', 'null'] },
            postalCode: { bsonType: ['string', 'null'] },
          },
        },

        isActive: { bsonType: 'bool' },

        isDeleted: { bsonType: 'bool' },

        deletedAt: { bsonType: ['date', 'null'] },

        createdAt: { bsonType: 'date' },

        updatedAt: { bsonType: ['date', 'null'] },
      },
    },
  },
});

//Index Strategy (Very Important)
// Unique Subledger Code per Company
db.subledgers.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCode: 1,
    code: 1,
  },
  { unique: true },
);

db.subledgers.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCode: 1,
    code: 1,
  },
  { unique: true },
);

// Collection: business_entities
//resume here entity should have tenant and orgid
db.createCollection('business_entities', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['entityCode', 'entityType', 'name', 'status', 'createdAt'],
      properties: {
        entityCode: {
          bsonType: 'string',
          description: 'Unique entity code',
        },

        entityType: {
          enum: ['CUSTOMER', 'VENDOR', 'EMPLOYEE', 'BANK', 'GOVERNMENT'],
          description: 'Type of business entity',
        },

        name: {
          bsonType: 'string',
        },

        legalName: {
          bsonType: 'string',
        },

        contact: {
          bsonType: 'object',
          properties: {
            person: { bsonType: 'string' },
            phone: { bsonType: 'string' },
            mobile: { bsonType: 'string' },
            email: { bsonType: 'string' },
            website: { bsonType: 'string' },
          },
        },

        address: {
          bsonType: 'object',
          properties: {
            line1: { bsonType: 'string' },
            line2: { bsonType: 'string' },
            city: { bsonType: 'string' },
            state: { bsonType: 'string' },
            country: { bsonType: 'string' },
            pincode: { bsonType: 'string' },
          },
        },

        taxInfo: {
          bsonType: 'object',
          properties: {
            gstNumber: { bsonType: 'string' },
            panNumber: { bsonType: 'string' },
            vatNumber: { bsonType: 'string' },
            tanNumber: { bsonType: 'string' },
          },
        },

        bankDetails: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['bankName', 'accountNumber'],
            properties: {
              bankName: { bsonType: 'string' },
              branch: { bsonType: 'string' },
              accountNumber: { bsonType: 'string' },
              ifsc: { bsonType: 'string' },
              swift: { bsonType: 'string' },
              isPrimary: { bsonType: 'bool' },
            },
          },
        },

        creditPolicy: {
          bsonType: 'object',
          properties: {
            creditLimit: { bsonType: 'number' },
            paymentTerms: { bsonType: 'int' },
            currency: { bsonType: 'string' },
          },
        },

        kycDocuments: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              documentType: { bsonType: 'string' },
              documentNumber: { bsonType: 'string' },
              fileUrl: { bsonType: 'string' },
            },
          },
        },

        status: {
          bsonType: 'object',
          required: ['isActive'],
          properties: {
            isActive: { bsonType: 'bool' },
            isBlocked: { bsonType: 'bool' },
          },
        },

        createdAt: { bsonType: 'date' },
        updatedAt: { bsonType: 'date' },
      },
    },
  },
});

// Indexes
db.business_entities.createIndexes([
  { key: { entityCode: 1 }, unique: true },

  { key: { name: 1 } },

  { key: { entityType: 1 } },

  { key: { 'taxInfo.gstNumber': 1 } },

  { key: { createdAt: 1 } },
]);

// Sample Documents
Customer;
db.business_entities.insertOne({
  entityCode: 'CUST0001',
  entityType: 'CUSTOMER',

  name: 'ABC Traders',
  legalName: 'ABC Traders Pvt Ltd',

  contact: {
    person: 'Rajesh Kumar',
    mobile: '9876543210',
    email: 'accounts@abctraders.com',
  },

  address: {
    line1: 'MG Road',
    city: 'Ernakulam',
    state: 'Kerala',
    country: 'India',
    pincode: '682035',
  },

  taxInfo: {
    gstNumber: '32ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
  },

  bankDetails: [
    {
      bankName: 'HDFC Bank',
      branch: 'MG Road',
      accountNumber: '1234567890',
      ifsc: 'HDFC0001234',
      isPrimary: true,
    },
  ],

  creditPolicy: {
    creditLimit: 500000,
    paymentTerms: 30,
    currency: 'INR',
  },

  status: {
    isActive: true,
    isBlocked: false,
  },

  createdAt: new Date(),
  updatedAt: new Date(),
});
