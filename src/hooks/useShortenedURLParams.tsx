import { useParams } from 'react-router';

import { getUUID } from '../utils/utils';

export const useShortenURLParams = (key: string): string | undefined => {
  const params = useParams();

  const shortenUUID = params[key];

  const uuid = getUUID(shortenUUID);

  return uuid;
};
