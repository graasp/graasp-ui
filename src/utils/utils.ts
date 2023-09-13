import shortUUID from 'short-uuid';
import { validate } from 'uuid';

// todo: use graasp-utils repo
export const getParentsIdsFromPath = (
  path?: string,
  { ignoreSelf = false } = {},
): string[] => {
  if (!path) {
    return [];
  }

  let p = path;
  // ignore self item in path
  if (ignoreSelf) {
    // split path in half parents / self
    // eslint-disable-next-line no-useless-escape
    const els = path.split(/\.[^\.]*$/);
    // if els has only one element, the item has no parent
    if (els.length <= 1) {
      return [];
    }
    [p] = els;
  }
  const ids = p.replace(/_/g, '-').split('.');
  return ids;
};

export const isMemberIdValid = (memberId?: string): boolean => {
  if (!memberId) {
    return false;
  }
  return validate(memberId?.trim());
};

const { toUUID } = shortUUID();

export const getUUID = (shortenUUID: string = ''): string | undefined => {
  if (shortenUUID) {
    try {
      const uuid = toUUID(shortenUUID);
      return uuid;
    } catch (err) {
      return shortenUUID;
    }
  }
};
