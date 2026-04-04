function canonical(obj) {
  return JSON.stringify(obj || {});
}

function normalizeIndexOptions(opts = {}) {
  return {
    unique: opts.unique || false,
    sparse: opts.sparse || false,
    partialFilterExpression: opts.partialFilterExpression || null,
    expireAfterSeconds: opts.expireAfterSeconds || null,
    collation: opts.collation || null,
  };
}

function ensureIndex(db, collectionName, keys, options) {
  const col = db.getCollection(collectionName);

  if (!options.name) throw new Error('Index name required');

  const indexes = col.getIndexes();

  const existing = indexes.find((i) => i.name === options.name);

  if (!existing) {
    print('Creating index:', options.name);

    col.createIndex(keys, options);

    return;
  }

  const keysMatch = JSON.stringify(existing.key) === JSON.stringify(keys);

  const optionsMatch =
    JSON.stringify(normalizeIndexOptions(existing)) ===
    JSON.stringify(normalizeIndexOptions(options));

  if (!keysMatch || !optionsMatch) {
    print('Rebuilding index:', options.name);

    col.dropIndex(options.name);

    col.createIndex(keys, options);
  }
}
