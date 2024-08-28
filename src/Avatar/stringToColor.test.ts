import { describe, expect, it } from 'vitest';

import { stringToColor } from './stringToColor.js';

describe('stringToColor', () => {
  it('Generates a color from a string', () => {
    expect(stringToColor('abcd')).toEqual('#42942d');
    expect(stringToColor('toto')).toEqual('#366a36');
  });
});
