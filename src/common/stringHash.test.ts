import * as assert from 'assert';
import { stringHash } from './stringHash';

describe('hashGenerator', () => {
  it('generates 32 bit hash from string', () => {
    const str = 'hello';

    assert.strictEqual(stringHash(str), 99162322);
  });
});
