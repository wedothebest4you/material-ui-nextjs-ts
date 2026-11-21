const TENANT_QUERY_VALIDATION = {
  $cond: {
    if: {
      $eq: ['$__v', 0],
    },
    then: { $eq: [{ $type: '$updatedAt' }, 'null'] },
    else: {
      $eq: [{ $type: '$updatedAt' }, 'date'],
    },
  },
} as const;

export default TENANT_QUERY_VALIDATION;
