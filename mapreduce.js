function filterG(array, callbackFn) {
  const farray = [];
  for (const i of array) {
    if (callbackFn(i)) {
      farray.push(i);
    }
  }
  return farray;
}

function mapG(array, callbackFn) {
  const marray = [];
  for (const i of array) {
    marray.push(callbackFn(i));
  }
  return marray;
}

function reduceG(initialValue, array, callbackFn) {
  var acc = initialValue;
  for (const a of array) {
    acc = callbackFn(acc, a);
  }
  return acc;
}

function mapG2(array, callbackMFn) {
  function callbackRFn(accArray, item) {
    accArray.push(callbackMFn(item));
    return accArray;
  }

  return reduceG([], array, callbackRFn);
}

function filterG2(array, filterFn) {
  function callbackR(accArray, a) {
    if (filterFn(a)) accArray.push(a);
    return accArray;
  }

  return reduceG([], array, callbackR);
}

function mapG3(array, mapFn) {
  function redFn(accArray, item) {
    accArray.push(mapFn(item));
    return accArray;
  }
  return reduceG([], array, redFn);
}

function mapG4(array, mapFn) {
  function redFn(accArray, item) {
    accArray.push(mapFn(item));
    return accArray;
  }
  return reduceG([], array, (accArray, item));
}

function mapG5(array, mapFn) {
  // return reduceG([], array, (accArray, item) => {
  //     accArray.push(mapFn(item));
  //     return accArray;
  // })

  return reduceG([], array, (accArray, item) => [...accArray, mapFn(item)]);
}

function flatG(array) {
  const farray = [];
  for (const value of array) {
    if (Array.isArray(value)) {
      for (const inner of value) farray.push(inner);
    } else {
      farray.push(value);
    }
  }
  return farray;
}

function flatMapG(array, flatmapFn) {
  //const result = [];
  //for(const item of array){
  //for(const innerItem of flatmapFn(item)){
  //result.push(innerItem);
  //}
  //}
  //return result;

  let result = [];
  for (const item of array) {
    result = [...result, ...flatmapFn(item)];
  }
  return result;
}
