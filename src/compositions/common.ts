export const getIdFromLink = (link = '') => {
  const [, id] = link.match(/\/([0-9]+)\/*$/) || [];
  return id;
};

export const getDataFromLink = (link = '') => {
  if (link.indexOf('http') < 0) {
    return {};
  }

  const [, path, id] = link.match(/\/([^\\/]+)\/([0-9]+)\/*$/) || [];

  return { path, id };
};
