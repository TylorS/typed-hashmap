import * as assert from 'assert';
import { MASK } from './constants';
import {
  hammingWeight, hashFragment,
  toBitmap, bitmapToIndex } from './bitwise-operations';

describe('hammingWeight', () => {
  it('returns the hamming weight of a number', () => {
    assert.strictEqual(hammingWeight(1), 1);
    assert.strictEqual(hammingWeight(1), 1); // ensure pure function
    assert.strictEqual(hammingWeight(7), 3);
    assert.strictEqual(hammingWeight(7), 3); // ensure pure function
    assert.strictEqual(hammingWeight(9), 2);
    assert.strictEqual(hammingWeight(42), 3);
    assert.strictEqual(hammingWeight(100), 3);
    assert.strictEqual(hammingWeight(257), 2);
    assert.strictEqual(hammingWeight(1000000), 7);

    // edge cases
    assert.strictEqual(hammingWeight(Infinity), 0);
    assert.strictEqual(hammingWeight(-Infinity), 0);
    assert.strictEqual(hammingWeight(NaN), 0);
  });
});

describe('hashFragment', () => {
  it('returns a fragment of a hash given a bitwise shift', () => {
    const hash = 99162322; // hash of 'hello'

    assert.strictEqual(hashFragment(5, hash), 6);
    assert.strictEqual(hashFragment(2, hash), 20);
  });
});

describe('toBitmap', () => {
  it('converts a number to a bitmap', () => {
    const hash = 99162322; // hash of 'hello'

    assert.strictEqual(toBitmap(hash), 262144);
  });
});

describe('bitmapToIndex', () => {
  it('converts a bitmap to an index', () => {
    const bitmap = toBitmap(99162322);

    assert.strictEqual(bitmapToIndex(MASK, bitmap), 5);
  });
});
