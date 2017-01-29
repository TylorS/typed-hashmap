import { iterator, getNode } from './primitives';
import { HashMap } from './HashMap';
import { Leaf } from '../nodes';

export function values<K, V>(map: HashMap<K, V>) {
  return iterator(getNode(map), nodeValues);
}

function nodeValues<K, V>(node: Leaf<K, V>): V {
  return node.value;
}
