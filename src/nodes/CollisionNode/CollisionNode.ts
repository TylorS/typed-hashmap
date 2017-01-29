import { Collision, NodeType, Node } from '../types';
import { NOTHING } from '../constants';
import { LeafNode, combineLeafNodes } from '../LeafNode';
import { newCollisionList } from './newCollisionList';

export class CollisionNode<K, V> implements Collision<K, V> {
  public type: NodeType.COLLISION = NodeType.COLLISION;

  public hash: number;
  public children: Array<LeafNode<K, V>>;

  constructor(hash: number, children: Array<LeafNode<K, V>>) {
    this.hash = hash;
    this.children = children;
  }

  public modify(
    shift: number,
    get: (value?: V) => V,
    hash: number,
    key: K,
    size: { value: number }): Node<K, V>
  {
    if (hash === this.hash) {
      const list: Array<LeafNode<K, V>> =
        newCollisionList(this.hash, this.children, get, key, size);

      if (list === this.children)
        return this;

      return list.length > 1
        ? new CollisionNode(this.hash, list)
        : list[0];
    }

    const value = get();

    if (value === NOTHING)
      return this;

    ++size.value;

    return combineLeafNodes(shift, this.hash, this as any, hash, new LeafNode(hash, key, value));
  }
}
