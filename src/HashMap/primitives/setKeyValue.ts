import { Node } from '../../nodes';
import { HashMap } from '../HashMap';
import { findHash } from './findHash';
import { getNode } from './getNode';
import { getSize } from './getSize';
import { setTree } from './setTree';

const constant = <T>(x: T) => () => x;

export function setKeyValue<K, V>(
  key: K,
  value: V,
  map: HashMap<K, V>): HashMap<K, V>
{
  const hash: number = findHash(key);

  const size = { value: getSize(map) };

  const newNode: Node<K, V> = getNode(map).modify(0, constant(value), hash, key, size);

  return setTree<K, V>(newNode, size.value, map);
}
