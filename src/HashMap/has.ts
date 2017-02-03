import { findHash, getHash } from './primitives';

import { HashMap } from './HashMap';
import { NOTHING } from '../nodes';

export function has<K, V>(key: K, map: HashMap<K, V>): boolean;
export function has<K, V>(key: K): (map: HashMap<K, V>) => boolean;

export function has<K, V>(key: K, map?: HashMap<K, V>) {
  const hash = findHash(key);

  if (map)
    return getHash(NOTHING, hash, key, map) !== NOTHING;

  return function getValueFromMap (_map: HashMap<K, V>) {
    return getHash(NOTHING, hash, key, _map) !== NOTHING;
  };
}
