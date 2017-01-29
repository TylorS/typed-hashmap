import { iterator, getNode } from './primitives';
import { HashMap } from './HashMap';
import { Leaf } from '../nodes';

export function keys<K, V>(map: HashMap<K, V>) {
  return iterator(getNode(map), nodeKeys);
}

function nodeKeys<K, V>(node: Leaf<K, V>): K {
  return node.key;
}
