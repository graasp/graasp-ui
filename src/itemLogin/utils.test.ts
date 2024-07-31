import { v4 } from 'uuid';
import { describe, expect, it } from 'vitest';

import { isMemberIdValid } from './utils.js';

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
