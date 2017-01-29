import { Node, NodeType, Leaf } from '../types';
import { NOTHING } from '../constants';
import { empty } from '../EmptyNode';
import { combineLeafNodes } from './combineLeafNodes';

export class LeafNode<K, V> implements Leaf<K, V> {
  public type: NodeType.LEAF = NodeType.LEAF;
  public hash: number;
  public key: K;
  public value: V;

  constructor(hash: number, key: K, value: V) {
    this.hash = hash;
    this.key = key;
    this.value = value;
  }

  public modify(
    shift: number,
    get: (value?: V) => V,
    hash: number,
    key: K,
    size: { value: number }): Node<K, V>
  {
    if (key === this.key) {
      const value = get(this.value);

      if (value === this.value)
        return this;

      if (value === NOTHING) {
        --size.value;
        return empty<K, V>();
      }

      return new LeafNode<K, V>(hash, key, value);
    }

    const value = get();

    if (value === NOTHING)
      return this;

    ++size.value;

    return combineLeafNodes(shift, this.hash, this, hash, new LeafNode(hash, key, value));
  }
}
