import { NodeType, ListNode, Node } from '../types';
import { empty } from '../EmptyNode';
import { SIZE, MIN_ARRAY_NODE, replace, hashFragment } from '../../common';
import { toIndexNode } from './toIndexNode';

export class ArrayNode<K, V> implements ListNode<K, V> {
  public type: NodeType.ARRAY = NodeType.ARRAY;
  public size: number;
  public children: Array<Node<K, V>>;

  constructor(size: number, children: Array<Node<K, V>>) {
    this.size = size;
    this.children = children;
  }

  public modify(
    shift: number,
    get: (value?: V) => V,
    hash: number,
    key: K,
    size: { value: number }): Node<K, V>
  {
    const { size: count, children } = this;
    const fragment = hashFragment(shift, hash);
    const child = children[fragment];
    const newChild =
      (child || empty<K, V>()).modify(shift + SIZE, get, hash, key, size);

    if (child === newChild)
      return this;

    if (isEmptyNode(child) && !isEmptyNode(newChild))
      return new ArrayNode(count + 1, replace(fragment, newChild, children));

    if (!isEmptyNode(child) && isEmptyNode(newChild))
      return count - 1 <= MIN_ARRAY_NODE
        ? toIndexNode(count, fragment, children)
        : new ArrayNode<K, V>(count - 1, replace(fragment, empty<K, V>(), children));

    return new ArrayNode(count, replace(fragment, newChild, children));
  }
}

function isEmptyNode(node: Node<any, any>): boolean {
  return node && node.type === NodeType.EMPTY;
}
