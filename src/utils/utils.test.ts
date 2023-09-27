import shortUUID from 'short-uuid';
import { v4 } from 'uuid';

import { getUUID } from './utils';

describe('Utils', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('UUID', () => {
    it('Get long UUID from short-uuid', () => {
      const { fromUUID } = shortUUID();
      const longUUID = v4();
      const shortenedUUID = fromUUID(longUUID);
      const result = getUUID(shortenedUUID);
      expect(result).toEqual(longUUID);
    });
    it('Get long UUID from longUUID', () => {
      const longUUID = v4();
      const result = getUUID(longUUID);
      expect(result).toEqual(longUUID);
    });
    it('Prints an error when UUID is not defined', () => {
      const uuid = undefined;
      const mockedConsoleError = jest.fn();
      console.error = mockedConsoleError;
      const result = getUUID(uuid);
      expect(result).toBeFalsy();
      expect(mockedConsoleError).toHaveBeenCalledWith(
        new Error('uuid should have a value'),
      );
    });
  });
});
