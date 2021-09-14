const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Andrew',
      age: 26
    });
    // reject('Something went wrong!');
  }, 5000);
});

console.log('before');

// promise.then((data) => { //Both then's don't get called in case promise rejects
//   console.log('1', data);
//   return 'some data';
// }).then((str) => { //promise chaining. Runs after above callback function but this doesn't get called with data resolved by promise. Instead, 1st fn can pass data to this fn
//   console.log('does this run?', str); 
// }).catch((error) => {
//   console.log('error: ', error);
// });

promise.then((data) => { 
  console.log('1', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is from new promise')
    }, 5000)
  })
}).then((str) => { //promise chaining. But this is the success case for the new promise returned above!
  console.log('does this run?', str); 
}).catch((error) => {
  console.log('error: ', error);
});

console.log('after');
