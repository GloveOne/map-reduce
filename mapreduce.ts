import { assertEquals } from "jsr:@std/assert";

function mapG<A, B>(
  collection: Array<A>,
  mapFunction: (item: A) => B
): Array<B> {
  const mappedCollection: Array<B> = [];
  for (const item of collection) {
    mappedCollection.push(mapFunction(item));
  }
  return mappedCollection;
}

function flatMapG<A, B>(
  collection: Array<A>,
  mapFunction: (item: A) => Array<B>
): Array<B> {
  const flatmappedCollection: Array<B> = [];
  for (const itemOfTypeA of collection) {
    for (const itemOfTypeB of mapFunction(itemOfTypeA)) {
      flatmappedCollection.push(itemOfTypeB);
    }
  }
  return flatmappedCollection;
}
//return array.reduce(
//  (result: Array<B>, item: A) => [...result, ...mapFunction(item)],
//  []
//);

function filterG<A>(
  collection: Array<A>,
  filterFunction: (item: A) => boolean
): Array<A> {
  const filteredCollection: Array<A> = [];
  for (const item of collection) {
    if (filterFunction(item)) filteredCollection.push(item);
  }
  return filteredCollection;
}

function reduceG<A, B>(
  collection: Array<A>,
  reducerFunction: (value: B, item: A) => B,
  initialValue: B
): B {
  let reducedValue: B = initialValue;
  for (const item of collection) {
    reducedValue = reducerFunction(reducedValue, item);
  }
  return reducedValue;
}

function reduceG2<A>(
  collection: Array<A>,
  reducerFunction: (value: A, item: A) => A,
  initialValue?: A
): A {
  if (initialValue === undefined) {
    let reducedValue = collection[0];
    for (let _i = 1; _i <= collection.length; _i++) {
      reducedValue = reducerFunction(reducedValue, collection[_i]);
    }
    return reducedValue;
  } else {
    let reducedValue: A = initialValue;
    for (const item of collection) {
      reducedValue = reducerFunction(reducedValue, item);
    }
    return reducedValue;
  }
}

function everyG<A>(
  collection: Array<A>,
  proposition: (item: A) => boolean
): boolean {
  for (const item of collection) {
    if (!proposition(item)) return false;
  }
  return true;
}

function someG<A>(
  collection: Array<A>,
  proposition: (item: A) => boolean
): boolean {
  for (const item of collection) {
    if (proposition(item)) return true;
  }
  return false;
}

function forEachG<A, B>(collection: Array<A>, method: (item: A) => B): void {
  for (const item of collection) {
    method(item);
  }
}

forEachG([1, 2, 3, 4, 5, 6], console.log);

Deno.test("map test", () => {
  assertEquals(
    mapG([1, 2, 3, 4], (n) => n ** 2),
    [1, 4, 9, 16]
  );
});

Deno.test("map on empty array", () => {
  assertEquals(
    mapG([], (n) => n ** 2),
    []
  );
});

Deno.test("flatmap", () => {
  assertEquals(
    flatMapG([1, 2, 3], (n) => [n, n ** 2]),
    [1, 1, 2, 4, 3, 9]
  );
});

Deno.test("filter", () => {
  assertEquals(
    filterG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => n % 2 === 0),
    [2, 4, 6, 8]
  );
});

Deno.test("Reduce", () => {
  assertEquals(
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n + m, 0),
    45
  );
  assertEquals(
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n * m, 1),
    362880
  );
});

Deno.test("Reduce2.0", () => {
  assertEquals(
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n ** m, 1),
    [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((n, m) => n ** m, 1)
  );
});

Deno.test("ReduceG2 tests", () => {
  assertEquals(
    reduceG2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n + m, 0),
    45
  );
  assertEquals(
    reduceG2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n * m, 1),
    362880
  );
  assertEquals(
    reduceG2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n ** m, 1),
    [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((n, m) => n ** m, 1)
  );
});

Deno.test("Every", () => {
  assertEquals(
    everyG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    true
  );
  assertEquals(
    everyG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    false
  );
});

Deno.test("Some", () => {
  assertEquals(
    someG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    true
  );
  assertEquals(
    someG([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    false
  );
});
