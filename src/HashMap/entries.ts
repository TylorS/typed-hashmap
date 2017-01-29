import { iterator, getNode } from './primitives';
import { HashMap } from './HashMap';
import { Leaf } from '../nodes';

export function entries<K, V>(map: HashMap<K, V>) {
  return iterator(getNode(map), nodeEntries);
}

function nodeEntries<K, V>(node: Leaf<K, V>): [K, V] {
  return [node.key, node.value];
}
