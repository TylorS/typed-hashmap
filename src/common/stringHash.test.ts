import { eq } from '@briancavalier/assert';
import { stringHash } from './stringHash';

describe('hashGenerator', () => {
  it('generates 32 bit hash from string', () => {
    const str = 'hello';

    eq(stringHash(str), 99162322);
  });
});
