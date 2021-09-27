export const getListOfIds = (data: { id: number }[]) =>
  data.map(({ id }) => {
    return id;
  });

export const removeIdFromList = (data: number[], idToRemove: number) =>
  data.filter((id) => {
    return id !== idToRemove;
  });

export const addIdFromList = (data: number[], id: number) => [...data, id];
