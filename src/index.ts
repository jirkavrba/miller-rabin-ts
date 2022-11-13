import crypto from "node:crypto";

// Find s and d such that n − 1 = 2^s * d by factorizing out powers of 2
const findSD = (n: bigint): { s: bigint, d: bigint } => {
    let s = 0n;
    let d = (n - 1n);

    // While the d is even
    while ((d & 1n) === 0n) {
        s++;
        d >>= 1n; // Faster than division by 2
    }

    return { s, d }
}

// Return a random bigint within the specified lower and upper bounds
const random = (low: bigint, high: bigint): bigint => {
    const range = high - low;
    const length = range.toString(2).length; // Bigint doesn't support log2
    const bytes = crypto.getRandomValues(new Uint8Array(length));

    return low + bytes.reduce((acc, byte) => ((acc + BigInt(byte & 1)) << 1n) , BigInt(0));
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
export const isProbablePrime = (n: bigint, k: number): boolean => {
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