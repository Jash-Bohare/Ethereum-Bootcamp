class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node;
            return;
        }

        let current = this.root;

        while (true) {
            if (node.data < current.data) {
                if (current.left === null) {
                    current.left = node;
                    return;
                }
                current = current.left;
            } 
            else if (node.data > current.data) {
                if (current.right === null) {
                    current.right = node;
                    return;
                }
                current = current.right;
            } 
            else {
                return;
            }
        }
    }

    hasNode(num){
        let current = this.root;

        while(current !== null){
            if(num === current.data){
                return true;
            }

            if(num < current.data){
                current = current.left;
            }

            else {
                current = current.right;
            }
        }

        return false;
    }
}
