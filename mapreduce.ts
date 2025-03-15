import { assertEquals } from "jsr:@std/assert";

function mapG<A, B>(array: Array<A>, fn: (item: A) => B): Array<B> {
  const arr: Array<B> = [];
  for (const item of array) {
    arr.push(fn(item));
  }
  return arr;
}

function flatMapG<A, B>(array: Array<A>, fn: (item: A) => Array<B>): Array<B> {
  //const arr: Array<B> = [];
  //for(const item of array){
  //for(const innerItem of item){
  //arr.push(fn(item))
  //}
  //}
  return array.reduce(
    (result: Array<B>, item: A) => [...result, ...fn(item)],
    []
  );
}

function filterG<A>(array: Array<A>, fn: (item: A) => boolean): Array<A> {
  const arr: Array<A> = [];
  for (const i of array) {
    if (fn(i)) arr.push(i);
  }
  return arr;
}

function reduceG<A, B>(
  array: Array<A>,
  initValue: B,
  redFn: (i: B, j: A) => B
): B {
  let arr: B = initValue;
  for (const i of array) {
    arr = redFn(arr, i);
  }
  return arr;
}

function everyG<A>(array: Array<A>, boFn: (item: A) => boolean): boolean {
  for (const i of array) {
    if (!boFn(i)) return false;
  }
  return true;
}

function someG<A>(array: Array<A>, boFn: (item: A) => boolean): boolean {
  for (const i of array) {
    if (boFn(i)) return true;
  }
  return false;
}

function forEachG<A, B>(array: Array<A>, fn: (item: A) => B): undefined {
  for (const i of array) {
    fn(i);
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
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, (n, m) => n + m),
    45
  );
  assertEquals(
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, (n, m) => n * m),
    362880
  );
});

Deno.test("Reduce2.0", () => {
  assertEquals(
    reduceG([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, (n, m) => n ** m),
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
