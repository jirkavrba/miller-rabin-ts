
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
    if (n <= 2 || n % 2n === 0n) {
        return false;
    }

    // TODO

    return false;
};