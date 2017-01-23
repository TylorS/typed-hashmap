import { HashMap } from './HashMap';
import { getHash, findHash } from './primitives';

export function get<K, V>(key: K, map: HashMap<K, V>): K | null;
export function get<K, V>(key: K): (map: HashMap<K, V>) => K | null;

export function get<K, V>(key: K, map?: HashMap<K, V>) {
  const hash = findHash(key);

  if (map)
    return getHash(null, hash, key, map);

  return function getValueFromMap (_map: HashMap<K, V>) {
    return getHash(null, hash, key, _map);
  };
}
