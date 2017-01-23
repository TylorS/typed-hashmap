import { NOTHING } from '../nodes';
import { HashMap } from './HashMap';
import { getHash, findHash } from './primitives';

export function has<K, V>(key: K, map: HashMap<K, V>): K | null;
export function has<K, V>(key: K): (map: HashMap<K, V>) => K | null;

export function has<K, V>(key: K, map?: HashMap<K, V>) {
  const hash = findHash(key);

  if (map)
    return getHash(NOTHING, hash, key, map) !== NOTHING;

  return function getValueFromMap (_map: HashMap<K, V>) {
    return getHash(NOTHING, hash, key, _map) !== NOTHING;
  };
}
