const TrieNode = require('./TrieNode');

class Trie {
    constructor(node) {
        this.root = new TrieNode(node);
    }

    insert(str){
        let current = this.root;

        for(let char of str){
            if(!current.children[char]){
                current.children[char] = new TrieNode(char);
            }

            current = current.children[char];
        }

        current.isWord = true;
    }

    contains(word){
        let current = this.root;
        for(let char of word){
            if(!current.children[char]){
                return false;
            }

            current = current.children[char];
        }
        return current.isWord;

    }
}