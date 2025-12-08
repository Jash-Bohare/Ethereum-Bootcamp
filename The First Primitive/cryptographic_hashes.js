const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    const target = toHex(hash);

    for (let i = 0; i < COLORS.length; i++) {
        const color = COLORS[i];           // get the color at index i
        const bytes = utf8ToBytes(color);  // convert string to bytes
        const hashed = sha256(bytes);      // hash it

        if (toHex(hashed) === target) {    // compare
            return color;
        }
    }
    return null; // if nothing matched
}