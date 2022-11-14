# Miller-Rabin TS

A package to perform the Miller-Rabin primality test on `BigInt`s.

```ts
import { isProbablePrime } from "miller-rabin-ts";

// The implicit configuration performs 10 testing rounds

// You can either pass in a BigInt (either instance or literal)
isProbablePrime(20988936657440586486151264256610222593863921n); // true

// Or you can pass in a string
isProbablePrime("20988936657440586486151264256610222593863923"); // false

// You can also manually specify the number of testing rounds
// This check performs 40 rounds (which is quite a lot given how small the tested number is)
isProbablePrime(BigInt(2147483647), 40); // true
```

### Hol'up, isn't there an existing miller-rabin package?

That's correct my brother in Jesus Christ, however... the `miller-rabin` package

- doesn't have type definitions, so it cannot be used in TS without describing it manually
- doesn't work with javascript's built-in `BigInt` type, it uses the `bn.js` implementation instead
- is a bit messy imo, no offense