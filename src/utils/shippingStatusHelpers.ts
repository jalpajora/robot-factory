import { Robot, ShippingStatus } from '../state';

export const getUpdatedShippingStatus = (
  items: Robot[],
  id: number,
  shippingStatus: ShippingStatus
) => {
  return items
    .filter((item) => item.id === id)
    .map((item) => ({
      ...item,
      shippingStatus,
    }))[0];
};
