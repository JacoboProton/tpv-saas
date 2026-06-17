export function getContext(user: any) {
  return {
    tenantId: user.tenantId,
    storeId: user.storeId,
  };
}