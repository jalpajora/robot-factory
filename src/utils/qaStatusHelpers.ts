import { Robot } from '../state'; //QaStatuses

export const isForExtinguish = ({ configuration, statuses }: Robot) =>
  configuration.hasSentience && statuses.includes('on fire');
