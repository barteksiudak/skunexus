import { TObject } from '../types';

export function getIdFromLink(link = '') {
  const [, id] = link.match(/\/([0-9]+)\/*$/) || [];
  return id;
}

export function getDataFromLink(link = '') {
  if (link.indexOf('http') < 0) {
    return {};
  }

  const [, path, id] = link.match(/\/([^\\/]+)\/([0-9]+)\/*$/) || [];

  return { path, id };
}

export function mapByKey<T>(
  list: T[] = [],
  keyName: string = 'key'
): TObject<T> {
  return list.reduce((res, item) => {
    // @ts-ignore: Unreachable code error
    const key = item[keyName];
    return {
      ...res,
      [key]: item,
    };
  }, {});
}

export function getRandomBool() {
  return !!(Math.floor(Math.random() * 100000) % 2);
}
