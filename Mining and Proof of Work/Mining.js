const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  mempool.push(transaction);
}

function mine() {
  const block = {
    id: blocks.length,
    transactions: mempool.splice(0, MAX_TRANSACTIONS),
    nonce: 0
  };

  while (true) {
    const str = JSON.stringify(block);
    const bytes = utf8ToBytes(str);
    const hashBytes = sha256(bytes);
    const hashHex = toHex(hashBytes);

    const hashInt = BigInt(`0x${hashHex}`);

    if (hashInt < TARGET_DIFFICULTY) {
      block.hash = hashHex;
      break;
    }

    block.nonce++;
  }

  blocks.push(block);
  return block;
}