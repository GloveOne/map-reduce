import { assertEquals } from "jsr:@std/assert";

function mapG<A, B>(array: Array<A>, fn: (item: A) => B): Array<B> {
  const arr: Array<B> = [];
  for (const item of array) {
    arr.push(fn(item));
  }
  return arr;
}

mapG([1, 2, 3], (item) => item.toString());

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

Deno.test("map test", () => {
  assertEquals(
    mapG([1, 2, 3], (n) => n ** 2),
    [1, 4, 9]
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
    flatMapG([1, 2, 3], (n) => [n, n**2]),
    [1, 1, 2, 4, 3, 9]
  );
});