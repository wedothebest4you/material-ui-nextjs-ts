function ensureCollection(db, name, expectedOptions) {
  const info = db.runCommand({
    listCollections: 1,
    filter: { name },
  });

  const existing = info.cursor.firstBatch[0];

  if (!existing) {
    print('Creating collection:', name);

    db.createCollection(name, expectedOptions);
    updateSchemaVersion(db, name, schemaValidation);
    return;
  }

  const existingOptions = existing.options || {};

  if (JSON.stringify(existingOptions) !== JSON.stringify(expectedOptions)) {
    print('Updating collection schema:', name);

    db.runCommand({
      collMod: name,
      ...expectedOptions,
    });
  }
}

function updateSchemaVersion(db, collectionName, schemaValidation) {
  const versionEnum =
    schemaValidation.validator.$jsonSchema.properties.version.enum;

  if (!versionEnum || versionEnum.length === 0) {
    throw new Error(`Schema for ${collectionName} must define version enum`);
  }

  const latestVersion = versionEnum[0];

  db.schema_versions.updateOne(
    { collection: collectionName },
    {
      $set: {
        version: latestVersion,
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );
}
