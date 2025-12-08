const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function getAddress(publicKey) {
    const sliced = publicKey.slice(1);
    const hash = keccak256(sliced);
    const address = hash.slice(hash.length - 20, hash.length);
    return address;
}