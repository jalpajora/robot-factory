import { Robot, QaStatus } from '../state'; //QaStatuses

export const isForExtinguish = ({ configuration, statuses }: Robot) =>
  configuration.hasSentience && statuses.includes('on fire');

export const isForRecycle = (item: Robot) => {
  const { configuration, statuses } = item;
  const { numberOfRotors, Colour, hasWheels, hasTracks } = configuration;
  const rotors = Number(numberOfRotors);

  return (
    rotors < 3 ||
    rotors > 8 ||
    (rotors > 0 && Colour.toLowerCase() === 'blue') ||
    (hasWheels && hasTracks) ||
    (statuses.includes('loose screws') && hasWheels) ||
    statuses.includes('on fire')
  );
};

export const isForFactorySecond = ({ statuses }: Robot) =>
  statuses.includes('rusty') ||
  statuses.includes('loose screws') ||
  statuses.includes('paint scratched');

export const getQaStatus = (item: Robot): QaStatus => {
  const { qaStatus = '' } = item;
  if (qaStatus === '' && !isForExtinguish(item) && !isForRecycle(item)) {
    return isForFactorySecond(item) ? 'Factory Second' : 'Passed QA';
  }

  return qaStatus;
};
