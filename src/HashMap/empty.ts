import { EMPTY } from '../nodes';
import { HashMap } from './HashMap';

const EMPTY_MAP = new HashMap<any, any>(EMPTY, 0);

export function empty<K, V>(): HashMap<K, V> {
  return EMPTY_MAP;
}
