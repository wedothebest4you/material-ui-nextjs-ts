const TENANT_QUERY_VALIDATION = {
  $expr: {
    $cond: {
      if: {
        $eg: ['$_v', 0],
      },
    },
    then: { $eg: [{ $type: '$updatedAt' }, 'null'] },
    else: {
      $eg: [{ $type: '$updatedAt' }, 'date'],
    },
  },
} as const;

export default TENANT_QUERY_VALIDATION;
