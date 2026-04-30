const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('success');
    resolve('four');
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  reject(new Error('reject'));
});

async function test() {
  // Using .catch:
  await Promise.all([p1, p2]);
}

async function run() {
  try {
    await test();
  } catch (err) {
    console.log(err);
  }
}

run();
