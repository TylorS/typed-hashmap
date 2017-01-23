import { Node } from '../nodes';

export class HashMap<K, V> {
  constructor(private node: Node<K, V>, private size: number) {}
}
