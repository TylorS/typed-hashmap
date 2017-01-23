import { Node } from '../types';
import { ArrayNode } from '../ArrayNode';

export function toArrayNode<K, V>(
  fragment: number,
  child: Node<K, V>,
  bitmap: number,
  children: Array<Node<K, V>>)
{
  const array = [];
  let bit = bitmap;
  let count = 0;

  for (let i = 0; bit; ++i) {
    if (bit & 1)
      array[i] = children[count++];
    bit >>>= 1;
  }

  array[fragment] = child;

  return new ArrayNode(count + 1, array);
}
