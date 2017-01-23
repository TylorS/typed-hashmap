import { eq } from '@briancavalier/assert';
import { MASK } from './constants';
import {
  hammingWeight, hashFragment,
  toBitmap, bitmapToIndex } from './bitwise-operations';

describe('hammingWeight', () => {
  it('returns the hamming weight of a number', () => {
    eq(hammingWeight(1), 1);
    eq(hammingWeight(1), 1); // ensure pure function
    eq(hammingWeight(7), 3);
    eq(hammingWeight(7), 3); // ensure pure function
    eq(hammingWeight(9), 2);
    eq(hammingWeight(42), 3);
    eq(hammingWeight(100), 3);
    eq(hammingWeight(257), 2);
    eq(hammingWeight(1000000), 7);

    // edge cases
    eq(hammingWeight(Infinity), 0);
    eq(hammingWeight(-Infinity), 0);
    eq(hammingWeight(NaN), 0);
  });
});

describe('hashFragment', () => {
  it('returns a fragment of a hash given a bitwise shift', () => {
    const hash = 99162322; // hash of 'hello'

    eq(hashFragment(5, hash), 6);
    eq(hashFragment(2, hash), 20);
  });
});

describe('toBitmap', () => {
  it('converts a number to a bitmap', () => {
    const hash = 99162322; // hash of 'hello'

    eq(toBitmap(hash), 262144);
  });
});

describe('bitmapToIndex', () => {
  it('converts a bitmap to an index', () => {
    const bitmap = toBitmap(99162322);

    eq(bitmapToIndex(MASK, bitmap), 5);
  });
});
