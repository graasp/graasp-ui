import shortUUID from 'short-uuid';
import { validate, version } from 'uuid';

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
/**
 * Expand a short UUID into its v4 counterpart. If given a long uuid as import it return it as is.
 * @param shortenUUID a string holding a short-uuid or a uuid v4 (long)
 * @returns long version of the uuid v4
 */
export const getUUID = (shortenUUID?: string): string | undefined => {
  // start by checking if the UUID is a v4
  if (shortenUUID && validate(shortenUUID) && version(shortenUUID) === 4) {
    // return as is
    return shortenUUID;
  } else {
    try {
      if (shortenUUID) {
        const uuid = toUUID(shortenUUID);
        return uuid;
      }
      throw new Error('uuid should have a value');
    } catch (err) {
      console.error(err);
      return shortenUUID;
    }
  }
};
