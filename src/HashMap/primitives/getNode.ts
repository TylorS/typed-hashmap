import { Node } from '../../nodes';
import { HashMap } from '../HashMap';

export function getNode<K, V>(map: HashMap<K, V>) {
  return ((map as any).node as Node<K, V>);
}
