import crypto from "node:crypto";

// Find s and d such that n − 1 = 2^s * d by factorizing out powers of 2
const findSD = (n: bigint): { s: bigint, d: bigint } => {
    let s = BigInt(0);
    let d = (n - BigInt(1));

    // While the d is even
    while ((d & BigInt(1)) === BigInt(0)) {
        s++;
        d >>= BigInt(1); // Faster than division by 2
    }

    return { s, d }
}

// Return a random bigint within the specified lower and upper bounds
const random = (low: bigint, high: bigint): bigint => {
    const range = high - low;
    const length = range.toString(2).length; // Bigint doesn't support log2
    const bytes = crypto.getRandomValues(new Uint8Array(length));

    return low + bytes.reduce((acc, byte) => ((acc + BigInt(byte & 1)) << BigInt(1)) , BigInt(0));
}

// Return a modular exponentiation that equals
// b^e mod n
const modExp = (b: bigint, e: bigint, n: bigint): bigint => {
    let result = BigInt(1);

    while (e > 0) {
        if ((e & BigInt(1)) === BigInt(0)) {
            result = result * b % n;
        }

        e >>= BigInt(1);
        b = b ** BigInt(2) % n;
    }

    return result;
}

/**
 * Tests, whether the provided integer n is a prime number based on the Miller-Rabin primality test
 * 
 * @link https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
 * 
 * @param {bigint | string} input The integer that should be tested for primality
 * @param {number} k Number of testing rounds to perform
 * @returns 
 */
export const isProbablePrime = (input: bigint | string, k: number = 10): boolean => {
    if (k < 1) {
        throw RangeError("The number of testing rounds must be greater than zero!");
    }

    const n = BigInt(input);

    // Numbers < 2 and even numbers can be trivially excluded from the test
    if (n <= BigInt(2) || (n & BigInt(1)) === BigInt(0)) {
        return false;
    }

    // let s > 0 and d odd > 0 such that n − 1 = 2^s * d 
    const { s, d } = findSD(n);
    
    for (let i = 0; i < k; i++) {
        let a = random(BigInt(2), n - BigInt(2));
        let x = modExp(a, d, n);
        let y = BigInt(0);

        for (let j = 0; j < s; j++) {
            y = modExp(x, BigInt(2), n);
            
            // Nontrivial square root of 1 modulo n
            if (y === BigInt(1) && x !== BigInt(1) && x !== n - BigInt(1)) {
                return false;
            }

            x = y;
        }

        if (y !== BigInt(1)) {
            return false;
        }
    }

    // The number is probably prime
    return true;
};