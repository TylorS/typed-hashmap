import { Empty, Node, NodeType } from './types';
import { NOTHING } from './constants';
import { LeafNode } from './LeafNode';

export class EmptyNode<K, V> implements Empty<K, V> {
  public type: NodeType.EMPTY = NodeType.EMPTY;

  public modify(
    shift: number,
    get: (value?: any) => any,
    hash: number,
    key: K,
    size: { value: number }): Node<K, V>
  {
    const value = get(void shift);
    if (value === NOTHING)
      return this;

    ++size.value;

    return new LeafNode(hash, key, value);
  }
}

export const EMPTY = new EmptyNode<any, any>();

export function empty<K, V>(): Empty<K, V> {
  return EMPTY;
}
