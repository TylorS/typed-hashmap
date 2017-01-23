import { Node } from '../../nodes';
import { HashMap } from '../HashMap';
import { getNode } from './getNode';

/**
 * Creates a new HashMap with a given Node and size
 * Does not create a new HashMap if the new Node is the same (by reference)
 * to the current (private) root Node.
 */
export function setTree<K, V>(node: Node<K, V>, size: number, map: HashMap<K, V>) {
  // use type casting to keep node private on HashMap
  return node === getNode<K, V>(map)
    ? map
    : new HashMap(node, size);
}
