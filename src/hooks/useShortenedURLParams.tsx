import { useParams } from 'react-router-dom';

import { getUUID } from '../utils/utils';

export const useShortenURLParams = (key: string): string | undefined => {
  const params = useParams();

  const shortenUUID = params[key];

  const uuid = getUUID(shortenUUID);

  return uuid;
};
