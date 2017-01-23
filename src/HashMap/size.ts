import { HashMap } from './HashMap';
import { getSize } from './primitives/getSize';

export function size(map: HashMap<any, any>): number {
  return getSize(map);
}
