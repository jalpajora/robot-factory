import { Robot } from '../state'; //QaStatuses

export const isForExtinguish = ({ configuration, statuses }: Robot) =>
  configuration.hasSentience && statuses.includes('on fire');

export const isForRecycle = (item: Robot) => {
  const { configuration, statuses } = item;
  const { numberOfRotors, Colour, hasWheels, hasTracks } = configuration;
  const rotors = Number(numberOfRotors);

  if (isForExtinguish(item)) {
    return false;
  }

  return (
    rotors < 3 ||
    rotors > 8 ||
    (rotors > 0 && Colour.toLowerCase() === 'blue') ||
    (hasWheels && hasTracks) ||
    (statuses.includes('loose screws') && hasWheels) ||
    statuses.includes('on fire')
  );
};
