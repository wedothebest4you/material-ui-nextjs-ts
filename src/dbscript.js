// https://www.mongodb.com/docs/mongodb-shell/write-scripts/

/*

Tenant
Organisation
Company Code
Fiscal Period
Account Template
Accounts

ToDos:
------------------------------------------------
1. For sharding, this AI recommendation is to check. It is included in the chat as below:
"How tenantId + organizationId should influence MongoDB sharding strategy in large ERP systems."

2. Automated provisioning: 
"കൃത്യമായ പരിശോധനയ്ക്കും മാനദണ്ഡങ്ങൾക്കും വിധേയമായി അനുവദിക്കുന്ന പ്രക്രിയയാണ്".

Specific to a multi-tenant applications, the same process is termed as
Tenant Creation Bootstrap. The creation of the default organisation and admin 
for a tenant will take care here.

Ideally this should run inside one database transaction.
An synch processing by Activity change stream, may not fit here.

Step 1  Create Tenant
Step 2  Create Default Organization
Step 3  Create Organization Admin User
Step 4  Send credentials / invite

In addition to org and admin, the following business entities
may also be bootstrapped.

  1. Chart of Accounts // this has a separate process, therefore may be encluded from here
  2. Voucher Types
  3. Warehouses //given just for reference
  4. Tax Config //given just for reference
  5. Financial Year

  Citation : https://chatgpt.com/s/t_69c9ecb7ab6481918cc67268986eda1e

3. The following suggestion is also to review later.
How to structure MongoDB collections so that tenant + organization isolation is automatically enforced in every query without relying on developers to remember it.
https://chatgpt.com/s/t_69c9efad95788191a8795a27457e813a



1. How to embedd subdocunments for parent account
at present it is referenced.

2. The accounts schema will be populated by the
Account projection worker. It is based on the two
collections - Global event stream and Synch state.
Therefore all these are to be designed.


*/

const { connect } = require('http2');
const PRD = true;

// Below is a MongoDB shell / mongosh script that:

// An example of the data collections
// tenanst
// org
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

// maintain the latest schemaversion in the system
// enforce it by schema validation, enum
// tenants
// organizations
// users
// accountTemplates
// companyCodes
// fiscalPeriods
// accounts
// business_entities
// subledgers

db.createCollection('tenants', {
  validator: {
    $jsonSchema: {
      title: 'Tenant',
      bsonType: 'object',
      additionalProperties: false,
      required: [
        '_id',
        'name',
        'code',
        'plan',
        'status',
        'createdAt',
        'version',
      ],
      properties: {
        _id: {
          bsonType: 'objectId',
          title: 'Primary Identifier',
        },

        name: {
          bsonType: 'string',
          title: 'Tenant Name',
          description: 'Tenant name',
          maxLength: 60,
        },

        code: {
          bsonType: 'string',
          title: 'Tenant Code',
          description: 'Unique tenant code',
          maxLength: 30,
        },

        plan: {
          bsonType: 'string',
          title: 'Subscription Plan',
          enum: ['basic', 'standard', 'enterprise'],
        },

        status: {
          bsonType: 'string',
          title: 'Tenant Status',
          enum: ['active', 'inactive'],
        },

        createdAt: {
          bsonType: 'date',
          title: 'Creation Date',
        },

        updatedAt: {
          bsonType: ['date', 'null'],
          title: 'Last Updated Date',
        },

        deletedAt: {
          bsonType: ['date', 'null'],
          title: 'Soft Delete Timestamp',
        },

        version: {
          bsonType: 'int',
          title: 'Document Version',
          enum: [1],
        },

        createdBy: {
          bsonType: ['objectId', 'null'],
          title: 'Created By User',
        },

        updatedBy: {
          bsonType: ['objectId', 'null'],
          title: 'Updated By User',
        },

        userLimit: {
          bsonType: ['int', 'null'],
          title: 'Maximum Allowed Users',
          minimum: 1,
          maximum: 100000,
        },

        storageQuotaMb: {
          bsonType: ['int', 'null'],
          title: 'Storage Quota (MB)',
          minimum: 100,
          maximum: 1000000,
        },
        version: {
          bsonType: 'string',
          enum: ['v3'], // only latest allowed
        },
      },
    },
  },

  validationLevel: 'strict',
  validationAction: 'error',
});

// 2. Indexes for Tenants
db.tenants.createIndexes([
  { code: 1 },
  { unique: true, name: 'tenant_code_ux' },
  { name: 1 },
  { unique: true, name: 'tenant_name_ux' },
]);

// 3. Create organizations Collection
db.createCollection('organizations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'tenantId',
        'name',
        'code',
        'isSystemOrg',
        'status',
        'createdAt',
      ],
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

// Tenant + Org Code (unique per tenant)
db.organizations.createIndex(
  { tenantId: 1, code: 1 },
  { unique: true, name: 'org_tenant_code_ux' },
);

db.organizations.createIndex(
  { tenantId: 1, name: 1 },
  { unique: true, name: 'org_tenant_name_ux' },
);

// Ensure Only One System Organization Per Tenant
// Use a partial unique index.

db.organizations.createIndex(
  { tenantId: 1, isSystemOrg: 1 },
  {
    unique: true,
    partialFilterExpression: { isSystemOrg: true },
    name: 'only_one_org_bootsrapped_per_tenant',
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
    isSystemOrg: true,
    status: 'active',

    createdAt: new Date(),
  },
  {
    tenantId: t1,
    name: 'Alpha Trading',
    code: 'ALPHA-TRD',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t1,
    name: 'Alpha Logistics',
    code: 'ALPHA-LOG',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },

  /* ---------- Tenant 2 ---------- */

  {
    tenantId: t2,
    name: 'Beta Industries',
    code: 'BETA-IND',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t2,
    name: 'Beta Retail',
    code: 'BETA-RTL',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t2,
    name: 'Beta Distribution',
    code: 'BETA-DST',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },

  /* ---------- Tenant 3 ---------- */

  {
    tenantId: t3,
    name: 'Gamma Manufacturing',
    code: 'GAMMA-MFG',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t3,
    name: 'Gamma Trading',
    code: 'GAMMA-TRD',
    isSystemOrg: true,
    status: 'active',
    createdAt: new Date(),
  },
  {
    tenantId: t3,
    name: 'Gamma Services',
    code: 'GAMMA-SRV',
    isSystemOrg: true,
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
        'name',
        'email',
        'passwordHash',
        'isSystemAdmin',
        'role',
        'status',
        'createdAt',
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
        isSystemAdmin: {
          bsonType: 'bool',
          description: 'Admin created automatically during org bootstrap',
        },
        role: {
          bsonType: 'string',
          enum: ['org_admin', 'manager', 'user'],
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
  { unique: true, name: 'user_email_unique_in_an_org' },
);

// Tenant + Organization lookup
db.users.createIndex(
  { tenantId: 1, organizationId: 1 },
  { name: 'user_name_unique_in_an_org' },
);

// Only One System Admin Per Organization
// Use another partial unique index.

db.users.createIndex(
  { tenantId: 1, organizationId: 1, isSystemAdmin: 1 },
  {
    unique: true,
    partialFilterExpression: { isSystemAdmin: true },
    name: 'boostrapped_admn_unique_in_an_org',
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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
    isSystemAdmin: true,
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

db.accountTemplates.createIndex(
  { tenantId: 1, organizationId: 1, code: 1 },
  {
    unique: true,
    name: 'account_template_unique_code',
  },
);

db.accountTemplates.createIndex(
  { tenantId: 1, organizationId: 1, name: 1 },
  {
    unique: true,
    name: 'account_template_unique_name',
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
        'status',
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

        status: {
          bsonType: 'string',
          enum: ['active', 'inactive'],
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
  { unique: true, name: 'companyCode_unique_code' },
);
db.companyCodes.createIndex(
  { tenantId: 1, orgId: 1, name: 1 },
  { unique: true, name: 'companyCode_unique_name' },
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
    status: 'active',
    fiscalYearStart: new Date('2025-04-01'),
    createdAt: new Date(),
  },
  {
    tenantId: tenantId,
    orgId: organizationId,
    code: 'C002',
    name: 'ABC Trading Pvt Ltd',
    country: 'India',
    currency: 'INR',
    status: 'active',
    fiscalYearStart: new Date('2025-04-01'),
    createdAt: new Date(),
  },
  {
    tenantId: tenantId,
    orgId: organizationId,
    code: 'C001',
    name: 'Global Retail LLC',
    country: 'UAE',
    currency: 'AED',
    status: 'active',
    fiscalYearStart: new Date('2025-01-01'),
    createdAt: new Date(),
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
  { unique: true, name: 'fiscalPeriod_unique_period' },
);

db.fiscalPeriods.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    status: 1,
  },
  { name: 'fiscalPeriod_status' },
);

db.fiscalPeriods.insertMany([
  {
    tenantId: tenantId,
    orgId: organizationId,
    companyCodeId: cCodeId._id,
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
      required: [
        'tenantId',
        'orgId',
        'companyCodeId',
        'template',
        'allowPosting',
        'costBreakup',
        'hasSubledger',
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
    },
  },
});

// 3. Index Strategy (Very Important)

// Unique account code and name per company
db.accounts.createIndex(
  { tenantId: 1, orgId: 1, companyCodeId: 1, 'template.code': 1 },
  { unique: true, name: 'accounts_unique_code' },
);

db.accounts.createIndex(
  { tenantId: 1, orgId: 1, companyCodeId: 1, 'template.name': 1 },
  { unique: true, name: 'accounts_unique_name' },
);

// Hierarchy traversal
db.accounts.createIndex({
  tenantId: 1,
  orgId: 1,
  companyCodeId: 1,
  'template.path': 1,
  name: 'accounts_hierarchy_path',
});

// Parent lookup
db.accounts.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    'template.parentId': 1,
  },
  { name: 'accounts_hierarchy_parent' },
);

// Category queries
db.accounts.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCodeId: 1,
    'template.category': 1,
  },
  { name: 'accounts_category' },
);

// Collection: business_entities
//resume here entity should have tenant and orgid

db.createCollection('business_entities', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['tenantId', 'orgId', 'code', 'name', 'entityType', 'status'],
      properties: {
        tenantId: { bsonType: 'objectId' },

        orgId: { bsonType: 'objectId' },

        entityCode: {
          bsonType: 'string',
          description: 'Unique entity code',
        },
        name: {
          bsonType: 'string',
        },

        entityType: {
          enum: ['CUSTOMER', 'VENDOR', 'EMPLOYEE', 'BANK', 'GOVERNMENT'],
          description: 'Type of business entity',
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
  {
    key: { tenantId, orgId, code: 1 },
    unique: true,
    name: 'business_entities_unique_code',
  },

  {
    key: {
      tenantId,
      orgId,
      name: 1,
      unique: true,
      name: 'iu_business_entities_name',
    },
  },
]);

// Sample Documents
// Customer;
const beCustomer1 = {
  tenantId,
  orgId,
  code: 'CUST0001',
  name: 'ABC Traders Pvt Ltd',
  entityType: 'CUSTOMER',

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
};
db.business_entities.insertOne(beCustomer1);

const beCustomer2 = {
  tenantId,
  orgId,
  code: 'CUST0001',

  name: 'ABC Traders Pvt Ltd',
  entityType: 'CUSTOMER',

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
};
db.business_entities.insertOne(beCustomer2);

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
        'account',
        'isActive',
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
          required: ['code', 'entityType', 'name', 'status'],
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
        account: {
          bsonType: 'object',
          required: [
            'tenantId',
            'orgId',
            'companyCodeId',
            'template',
            'allowPosting',
            'costBreakup',
            'hasSubledger',
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
    'businessEntity.code': 1,
  },
  { unique: true, name: 'subledger_unique_code' },
);

db.subledgers.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCode: 1,
    'businessEntity.name': 1,
  },
  { unique: true, name: 'subledger_unique_name' },
);

db.subledgers.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCode: 1,
    'account.template.code': 1,
  },
  { name: 'subledger_account_code' },
);

db.subledgers.createIndex(
  {
    tenantId: 1,
    orgId: 1,
    companyCode: 1,
    'account.template.name': 1,
  },
  { name: 'subledger_account_name' },
);

// Sample SubLedger Document
//ToDo : The sample documents are to insert here

db.accounts.insertMany([
  {
    tenantId: tenantId,
    orgId: orgId,
    companyCodeId: cCodeId._id,

    template: {
      code: '110100',
      name: 'Accounts Receivable',
      type: 'ledger',
      category: 'asset',
      level: 3,
      path: '100000/110000/110100',
      parentId: ObjectId('660000000000000000000200'),
      createdAt: new Date(),
    },

    allowPosting: true,
    costBreakup: false,
    hasSubledger: true,
  },

  {
    tenantId: ObjectId('660000000000000000000001'),
    orgId: ObjectId('660000000000000000000010'),
    companyCodeId: ObjectId('660000000000000000000100'),

    template: {
      code: '110200',
      name: 'Bank Account',
      type: 'ledger',
      category: 'asset',
      level: 3,
      path: '100000/110000/110200',
      parentId: ObjectId('660000000000000000000200'),
      createdAt: new Date(),
    },

    allowPosting: true,
    costBreakup: false,
    hasSubledger: false,
  },

  {
    tenantId: ObjectId('660000000000000000000001'),
    orgId: ObjectId('660000000000000000000010'),
    companyCodeId: ObjectId('660000000000000000000100'),

    template: {
      code: '210100',
      name: 'Accounts Payable',
      type: 'ledger',
      category: 'liability',
      level: 3,
      path: '200000/210000/210100',
      parentId: ObjectId('660000000000000000000300'),
      createdAt: new Date(),
    },

    allowPosting: true,
    costBreakup: false,
    hasSubledger: true,
  },

  {
    tenantId: ObjectId('660000000000000000000001'),
    orgId: ObjectId('660000000000000000000010'),
    companyCodeId: ObjectId('660000000000000000000100'),

    template: {
      code: '510100',
      name: 'Sales Revenue',
      type: 'ledger',
      category: 'income',
      level: 3,
      path: '500000/510000/510100',
      parentId: ObjectId('660000000000000000000400'),
      createdAt: new Date(),
    },

    allowPosting: true,
    costBreakup: false,
    hasSubledger: false,
  },

  {
    tenantId: ObjectId('660000000000000000000001'),
    orgId: ObjectId('660000000000000000000010'),
    companyCodeId: ObjectId('660000000000000000000100'),

    template: {
      code: '610100',
      name: 'Office Expenses',
      type: 'ledger',
      category: 'expense',
      level: 3,
      path: '600000/610000/610100',
      parentId: ObjectId('660000000000000000000500'),
      createdAt: new Date(),
    },

    allowPosting: true,
    costBreakup: true,
    hasSubledger: false,
  },
]);
// Global Activity Stream (Event Source)

// 9. Recommended Projection Collections for Your ERP

// From the design we've built so far:

// Real-time
// --------
// notifications_projection
// activity_feed_projection
// approval_queue_projection

// Aggregated
// --------
// ledger_projection
// trial_balance_projection
// dashboard_metrics_projection
// business_entity_exposure_projection
// global_search_projection
