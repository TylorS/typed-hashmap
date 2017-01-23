import { HashMap } from '../HashMap';

export function getSize<T>(map: HashMap<any, T>): number {
  return (map as any).size as number;
}
