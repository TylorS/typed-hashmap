# @typed/hashmap

> Immutable HashMap for TypeScript

A fast and persistent (immutable) Hash Array Map Trie for TypeScript.

This is heavily based off of [hamt](https://github.com/mattbierner/hamt) and
was mainly done by me for learning purposes, but it is likely very useful, and I
plan to use it as well.

Once main difference to the hamt library is that keys can be of any type
including objects or arrays much like ES2015 `Map`s.
Another notable change is there are **not** prototype methods to allow
for ES2015 modules to be tree-shaken for smaller builds :fire:

There is a heavy emphasis on typing this library, and it's highly recommended
to be used with TypeScript to reap the full benefits of type guarantees.

There is more to be done but the bare minimum is definitely present.

## Let me have it!
```sh
npm install --save @typed/hashmap
```

## API

All multi-parameter functions are curried!

### Creating a HashMap

####`empty<K, V>(): HashMap<K, V>`

Creates an empty HashMap that will accept type `K` as keys and `V` as values.

```typescript
import { empty } from '@typed/hashmap';

const map = empty<string, number>();
```

#### `fromObject<V>(object: { [key: string]: V }): HashMap<K, V>`

Creates a HashMap from an object.

```typescript
import { fromObject } from '@typed/hashmap';

const map = fromObject<number>({ a: 1, b: 2 });
```

#### `fromArray<K, V>(array: Array<[K, V]>): HashMap<K, V>`

Creates a HashMap from an array of tuples.

```typescript
import { fromArray } from '@typed/hashmap';

const map = fromArray<string, number>([ ['a', 1], ['b', 2] ]);
```

#### `fromIterable<K, V>(iterable: Iterable<[K, V]>): HashMap<K, V>`

Creates a HashMap from an Iterable.

Warning: this method using `Array.from` internally, and will require a polyfill
if not in an environment that supports this feature.

```typescript
import { fromIterable } from '@typed/hashmap';

const map = fromIterable(someIterable);
```

### Using a HashMap

#### `set<K, V>(key: K, value: V, map: HashMap<K, V>): HashMap<K, V>`

Returns a new HashMap containing the `key` and `value` passed to `set`.
This operation is immutable and will not alter the map passed to it.

```typescript
import { set, get, empty } from '@typed/hashmap';

const map = empty<string, number>();

const a = set('a', 1, map);

console.log(get('a', a)) // 1
```

#### `get<K, V>(key: K, map: HashMap<K, V>): V | null`

Attempts to find a value in a given HashMap. Returns `null` if none can be found.

```typescript
import { set, get, empty } from '@typed/hashmap';

const map = empty<string, number>();

const a = set('a', 1, map);

console.log(get('a', a)) // 1
```

#### `has<K, V>(key: K, map: HashMap<K, V>): boolean`

Returns true if a map contains a particular key and false if it does not.

```typescript
import { empty, has, set } from '@typed/hashmap';

const hasA = has('a');

const map = empty<string, number>();

hasA(map) // false
hasA(set('a', 1, map)) // true
```

#### `size<K, V>(map: HashMap<K, V>): number`

Returns the number of key value pairs a given map contains

```typescript
import { size, empty, fromObject } from '@typed/hashmap';

size(empty()) // 0
size(fromObject({ a: 1, b: 2 })) // 2
```

#### `remove<K, V>(key: K, map: HashMap<K, V>): HashMap<K ,V>`

Returns a HashMap that no longer contains a value for `key`.

```typescript
import { remove, fromObject, has } from '@typed/hashmap';

const map = fromObject({ a: 1, b: 2, c: 3})

const hasB = has('b')

hasB(map) // true
hasB(remove('b', map)) // false
```

#### `entries<K, V>(map: HashMap<K, V>): Iterator<[K, V]>`

Guaranteeing no order creates an iterator of keys and values held within
a given HashMap.

```typescript
import { entries, fromObject } from '@typed/hashmap';

const map = fromObject({ a: 1, b: 2, c: 3 })

for (let entry of entries(map)) {
  console.log(entry) // ['a', 1] ['b', 2] ['c' 3]
}

// manually using iterator

const iterator = entries(map)

console.log(iterator.next().value) // ['a', 1]
console.log(iterator.next().value) // ['c', 3]
console.log(iterator.next().value) // ['b', 2]
console.log(iterator.next().value) // null
```

#### `keys<K, V>(map: HashMap<K, V>): Iterator<K>`

Guaranteeing no order creates an iterator of keys held within
a given HashMap.

```typescript
import { keys, fromArray } from '@typed/hashmap';

const map = fromArray([ ['a', 1], ['b', 2], ['c', 3] ])

const iterator = keys(map)

console.log(iterator.next().value) // 'a'
console.log(iterator.next().value) // 'b'
console.log(iterator.next().value) // 'c'
console.log(iterator.next().value) // null
```

#### `values<K, V>(map: HashMap<K, V>): Iterator<V>`

Guaranteeing no order creates an iterator of keys held within
a given HashMap.

```typescript
import { keys, fromArray } from '@typed/hashmap';

const map = fromArray([ ['a', 1], ['b', 2], ['c', 3] ])

const iterator = keys(map)

console.log(iterator.next().value) // 1
console.log(iterator.next().value) // 2
console.log(iterator.next().value) // 3
console.log(iterator.next().value) // null
```

#### `reduce<K, V, R>(f: (accum: R, value: V, key?: K) => R, seed: R, map: HashMap<K, V>): R`

Fold over the values held in a HashMap, similar to `Array.prototype.reduce`.

```typescript
import { reduce, fromIterable } from '@typed/hashmap';

const iterable = new Map([ [1, 1], [2, 2], [3, 3] ]);

const map = fromIterable(iterable);

const sum = (x: number, y: number) => x + y;

console.log(reduce(sum, 0, map)) // 6
```

#### `forEach<K, V>(f: (value: V, key?: K) => any, map: HashMap<K, V>): HashMap<K, V>`

Perform side effects on each value contained in a HashMap, returning the original
HashMap.

```typescript
import { forEach, fromObject } from '@typed/hashmap';

const map = fromObject({ a: 1, b: 2, c: 3 })

const map2 = forEach(x => console.log(x), map) // 1, 2, 3

map === map2 // true
```

#### `map<K, V, R>(f: (value: V, key?: K) => R, map: HashMap<K, V>): HashMap<K, R>;`

Creates a new HashMap of the same keys, but new values as the result of calling
the provided function on each value contained in the given HashMap, similar to
`Array.prototype.map`.

```typescript
import { map, forEach, fromObject } from '@typed/hashmap';

const a = map(x => x + 1, fromObject({ a: 1, b: 2, c: 3 }))

forEach((value, key) => console.log(value, key), a) // 'a' 2 , 'b' 3, 'c' 4
```

#### `filter<K, V>(predicate: (value: V, key?: K) => boolean, map: HashMap<K, V>): HashMap<K, V>`

Creates a new HashMap containing only values that return `true` when the predicate
function is called with a given value, similar to `Array.prototype.filter`.

```typescript
import { filter, forEach, fromObject } from '@typed/hashmap';

const a = filter(x => x % 2 === 0, fromObject({ a: 1, b: 2, c: 3 }))

forEach((value, key) => console.log(value, key), a) // 'b' 2
```