import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { getParentsIdsFromPath, isMemberIdValid } from './utils';

describe('Utils', () => {
  it('Parents ids from path', () => {
    const path = `123_345.567_456`;
    expect(getParentsIdsFromPath(path)).toEqual(['123-345', '567-456']);
  });

  it('Parents ids from path (ignore self)', () => {
    const path = `123_345.567_456`;
    expect(getParentsIdsFromPath(path, { ignoreSelf: true })).toEqual([
      '123-345',
    ]);
  });

  it('Empty path', () => {
    const path = ``;
    expect(getParentsIdsFromPath(path)).toEqual([]);
  });
});

describe('Validate MemberId', () => {
  it('Valid ID', () => {
    const id = v4();
    expect(isMemberIdValid(id)).toBeTruthy();
  });

  it('Valid ID with whitespace', () => {
    const id = `  ${v4()}   `;
    expect(isMemberIdValid(id)).toBeTruthy();
  });

  it('Invalid ID', () => {
    const id = `  bobo  `;
    expect(isMemberIdValid(id)).toBeFalsy();
  });
});
