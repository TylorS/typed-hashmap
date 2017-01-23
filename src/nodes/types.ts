export type Node<K, V>
  = IEmptyNode<K, V>
  | ILeafNode<K, V>
  | ICollisionNode<K, V>
  | IIndexedNode<K, V>
  | IArrayNode<K, V>;

export type Modify<K, V> =
  (shift: number,
   get: (value?: V) => V,
   hash: number,
   key: K,
   size: { value: number }) => Node<K, V>;

export interface IEmptyNode<K, V> {
  type: NodeType.EMPTY;
  modify: Modify<K, V>;
}

export interface ILeafNode<K, V> {
  type: NodeType.LEAF;
  hash: number;
  key: K;
  value: V;
  modify: Modify<K, V>;
}

export interface ICollisionNode<K, V> {
  type: NodeType.COLLISION;
  hash: number;
  children: Array<Node<K, V>>;
  modify: Modify<K, V>;
}

export interface IIndexedNode<K, V> {
  type: NodeType.INDEX;
  mask: number;
  children: Array<Node<K, V>>;
  modify: Modify<K, V>;
}

export interface IArrayNode<K, V> {
  type: NodeType.ARRAY;
  size: number;
  children: Array<Node<K, V>>;
  modify: Modify<K, V>;
}

export const enum NodeType {
  EMPTY,
  LEAF,
  COLLISION,
  INDEX,
  ARRAY,
}
