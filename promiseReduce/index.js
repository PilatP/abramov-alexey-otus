var fn1 = () => {
  console.log('fn1');
  return Promise.resolve(1);
};

var fn2 = () =>
  new Promise((resolve) => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
  });

const promiseReduce = (asyncFunctions, reduce, initialValue) => {
  return asyncFunctions.reduce(
    (prevFn, currentFn) =>
      prevFn.then(currentFn).then((value) => reduce(initialValue, value)),
    Promise.resolve()
  );
};

const promiseReduceAsync = async (asyncFunctions, reduce, initialValue) => {
  let memo = initialValue;

  for (const asyncFunction of asyncFunctions) {
    const value = await asyncFunction();
    memo = reduce(memo, value);
  }

  return memo;
};

const funcs = [fn1, fn2];
const initialValue = 1;
const reduce = (memo, value) => {
  console.log('reduce');
  return memo * value;
};
const processResults = console.log;

console.log('\n promiseReduce:');
promiseReduce(funcs, reduce, initialValue)
  .then(processResults)
  .then(() => {
    console.log('\n promiseReduceAsync:');
    promiseReduceAsync(funcs, reduce, initialValue).then(processResults);
  });

// Вывод в консоль

// fn1
// reduce
// fn2
// reduce
// 2
