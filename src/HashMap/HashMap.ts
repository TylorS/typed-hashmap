import { Node } from '../nodes';
import { entries } from './entries';

export class HashMap<K, V> implements Iterable<[K, V]> {
  constructor(private node: Node<K, V>, private size: number) {}

  public [Symbol.iterator](): Iterator<[K, V]> {
    return entries(this);
  }
}
