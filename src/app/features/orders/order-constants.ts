export const ORDER_TYPES = [
  {
    key: 'PRESC',
    value: 'Prescription'
  },
  {
    key: 'PHARMA',
    value: 'Pharmaceutical'
  },
  {
    key: 'PARAPHARMA',
    value: 'Parapharmaceutical'
  },
  {
    key: 'OTHER',
    value: 'Other'
  }
];

export const ORDER_STATUSES = [
  {
    key: 'INIT',
    value: 'Initialized'
  },
  {
    key: 'RECEIVED',
    value: 'Received'
  },
  {
    key: 'ORDERED',
    value: 'Ordered'
  },
  {
    key: 'COMPLETED',
    value: 'Completed'
  },
  {
    key: 'CANCELED',
    value: 'Canceled'
  },
  {
    key: 'FAILED',
    value: 'Failed'
  }
];

export function getTypeByCode(type: string): string {
  return ORDER_TYPES.filter(m => m.key === type).map(entry => entry.value)[0];
}

export function getStatusByCode(type: string): string {
  return ORDER_STATUSES.filter(m => m.key === type).map(entry => entry.value)[0];
}

export function getTypeByValue(value: string): string {
  return ORDER_TYPES.filter(m => m.value === value).map(entry => entry.key)[0];
}

export function getStatusByValue(value: string): string {
  return ORDER_STATUSES.filter(m => m.value === value).map(entry => entry.key)[0];
}
