import { default as isEqual } from 'lodash-es/isEqual';
import { Node, NodeType, LeafNode, IndexedNode, ArrayNode } from '../../nodes';
import { SIZE, hashFragment, toBitmap, bitmapToIndex } from '../../common';
import { HashMap } from './../HashMap';
import { getNode } from './getNode';

/**
 * Tries to find the value of a hash and key in a HashMap
 */
export function getHash<K, V, R>(
  defaultValue: R,
  hash: number,
  key: K,
  map: HashMap<K, V>): V | R
{
  let node: Node<K, V> = getNode<K, V>(map);
  let shift = 0;

  while (true) switch (node.type) {
    case NodeType.LEAF:
      return isEqual(key, (node as LeafNode<K, V>).key)
        ? (node as LeafNode<K, V>).value
        : defaultValue;

    case NodeType.COLLISION: {
      if (hash === node.hash) {
        const children = node.children;

        for (let i = 0; i < children.length; ++i) {
          const child = children[i] as LeafNode<K, V>;

          if (isEqual(key, child.key))
            return child.value;
        }

        return defaultValue;
      }
    }

    case NodeType.INDEX: {
      const fragment = hashFragment(shift, hash);
      const bit = toBitmap(fragment);

      if ((node as IndexedNode<K, V>).mask & bit) {
        const i = bitmapToIndex((node as IndexedNode<K, V>).mask, bit);
        node = (node as IndexedNode<K, V>).children[i];
        shift += SIZE;
        break;
      }

      return defaultValue;
    }

    case NodeType.ARRAY: {
      node = (node as ArrayNode<K, V>).children[hashFragment(shift, hash)];

      if (node) {
        shift += SIZE;
        break;
      }

      return defaultValue;
    }

    default: return defaultValue;
  }
}
