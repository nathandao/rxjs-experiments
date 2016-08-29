console.log('All prime numbers less than 100:');

function isPrime(n) {
  if (n === 2 || n == 1) return true;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

for (let i = 1; i < 100; i ++) {
  if (isPrime(i)) console.log(i);
}
