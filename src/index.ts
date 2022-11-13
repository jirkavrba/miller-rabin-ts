// Find s and d such that n − 1 = 2^s * d by factorizing out powers of 2
const findSD = (n: bigint): { s: bigint, d: bigint } => {
    let s = 0n;
    let d = (n - 1n);

    while (d % 2n === 0n) {
        s++;
        d /= 2n; // TODO: Can this be speeded by using bit shifting hacks?
    }

    return { s, d }
}

/**
 * Tests, whether the provided integer n is a prime number based on the Miller-Rabin primality test
 * 
 * @link https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
 * 
 * @param {bigint} n The integer that should be tested for primality
 * @param {number} k Number of testing rounds to perform
 * @returns 
 */
export const test = (n: bigint, k: number): boolean => {
    if (k < 1) {
        throw RangeError("The number of testing rounds must be greater than zero!");
    }

    // Numbers < 2 and even numbers can be trivially excluded from the test
    if (n <= 2n || n % 2n === 0n) {
        return false;
    }

    // let s > 0 and d odd > 0 such that n − 1 = 2^s * d 
    const { s, d } = findSD(n);


    return false;
};