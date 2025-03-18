import { assertEquals } from "jsr:@std/assert";

function mapG<A, B>(
  collection: A[],
  mapFn: (item: A, index: number) => B
): B[] {
  const results: B[] = [];
  let i = 0;
  for (const item of collection) {
    results.push(mapFn(item, i++));
  }
  return results;
}

function flatMapG<A, B>(
  collection: A[],
  mapFunction: (item: A, indexA: number, indexB: number) => B[]
): B[] {
  const results: B[] = [];
  let i = 0;
  let j = 0;
  for (const itemA of collection) {
    for (const itemB of mapFunction(itemA, i, j++)) {
      results.push(itemB);
    }
    i++;
  }
  return results;
}
//return array.reduce(
//  (result: B[], item: A) => [...result, ...mapFunction(item)],
//  []
//);

function filterG<A>(
  collection: A[],
  filterFunction: (item: A) => boolean
): A[] {
  const results: A[] = [];
  for (const item of collection) {
    if (filterFunction(item)) results.push(item);
  }
  return results;
}

/* Deprecated versions of reduce:
function reduceG<A, B>(
  collection: A[],
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
  collection: A[],
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
*/

function reduce<A>(
  collection: A[],
  reducerFunction: (acc: A, item: A) => A,
): A; 
function reduce<A, B>(
  collection: A[],
  reducerFunction: (acc: B, item: A) => B,
  initialValue: B
): A;
function reduce<A, B>(
  collection: A[],
  reducerFunction: (acc: A | B, item: A) => A | B,
  initialValue?: A | B
): A | B {
  let [results, initialIndex]: [A | B, number] = (initialValue === undefined) ? [collection[0], 1] : [initialValue, 0];
  for (let i = initialIndex; i < collection.length; i++) {
    results = reducerFunction(results, collection[i]);
  }
  return results;
}

function every<A>(collection: A[], proposition: (item: A) => boolean): boolean {
  for (const item of collection) {
    if (!proposition(item)) return false;
  }
  return true;
}

function some<A>(collection: A[], proposition: (item: A) => boolean): boolean {
  for (const item of collection) {
    if (proposition(item)) return true;
  }
  return false;
}

//In this standard implementation of none you visit every item of your collection.
//If at any point a proposition is true, then you return false.
//If you got to the end of your collection, then it means NONE of the stataments were true and thus it returns true.
function none<A>(
  collection: A[],
  proposition: (item: A) => boolean
): boolean {
  for (const item of collection) {
    if (proposition(item)) return false;
  }
  return true;
}

//By the implementations of none and some given above, it should be clear that none is equivalent to !some
//An easy way one can intuitively think about this is the proverb: "Nothing is not something!"
function none1<A>(
  collection: A[],
  proposition: (item: A) => boolean
): boolean {
  return !some(collection, proposition);
}

//As Cassiano insisted in using every, this is yet another implementation of none with a call to every
function none2<A>(
  collection: A[],
  proposition: (item: A) => boolean
): boolean {
  //return every(collection, !proposition);
  //The comment above is what I intended to write, but Typescript does not understand that !proposition should just
  //be the boolean function that negates the return result of the proposition function
  //I solved this problem explicitly defining this behavior by using the annonnimous function (x) => !proposition(X) in the call to the function every
  return every(collection, (x) => !proposition(x));
}

function forEachG<A, B>(
  collection: A[],
  method: (item: A, index: number) => B
): void {
  let i = 0;
  for (const item of collection) {
    method(item, i++);
  }
}

forEachG([1, 2, 3, 4, 5, 6], console.log);

forEachG([1, 2, 3, 4, 5, 6], (item) => console.log(item));

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
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n + m, 0),
    45
  );
  assertEquals(
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n * m, 1),
    362880
  );
});

Deno.test("Reduce2.0", () => {
  assertEquals(
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n ** m, 1),
    [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((n, m) => n ** m, 1)
  );
});

Deno.test("ReduceG2 tests", () => {
  assertEquals(
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n + m, 0),
    45
  );
  assertEquals(
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n * m, 1),
    362880
  );
  assertEquals(
    reduce([1, 2, 3, 4, 5, 6, 7, 8, 9], (n, m) => n ** m, 1),
    [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((n, m) => n ** m, 1)
  );
});

Deno.test("Every", () => {
  assertEquals(
    every([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    true
  );
  assertEquals(
    every([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    false
  );
});

Deno.test("Some", () => {
  assertEquals(
    some([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    true
  );
  assertEquals(
    some([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    false
  );
});

Deno.test("None", () => {
  assertEquals(
    none([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    false
  );
  assertEquals(
    none([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    true
  );
  assertEquals(
    none([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => n % 2 === 0),
    false
  );
});

Deno.test("None1", () => {
  assertEquals(
    none1([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    false
  );
  assertEquals(
    none1([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    true
  );
  assertEquals(
    none1([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => n % 2 === 0),
    false
  );
});

Deno.test("None2", () => {
  assertEquals(
    none2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "number"),
    false
  );
  assertEquals(
    none2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => typeof n === "undefined"),
    true
  );
  assertEquals(
    none2([1, 2, 3, 4, 5, 6, 7, 8, 9], (n) => n % 2 === 0),
    false
  );
});
