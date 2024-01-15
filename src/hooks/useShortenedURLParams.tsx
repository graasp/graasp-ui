import { useParams } from 'react-router-dom';

import { getUUID } from '../utils/utils';

/**
 * @deprecated we don't use short uuid anymore
 */
export const useShortenURLParams = (key: string): string | undefined => {
  const params = useParams();

  const shortenUUID = params[key];
  if (!shortenUUID) {
    return;
  }
  const uuid = getUUID(shortenUUID);

  return uuid;
};
