class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        let layer = this.leaves;

        while (layer.length > 1) {
            const nextLayer = [];

            for (let i = 0; i < layer.length; i += 2) {
                const left = layer[i];
                const right = layer[i + 1];

                if (right !== undefined) {
                    nextLayer.push(this.concat(left, right));
                } else {
                    nextLayer.push(left);
                }
            }

            layer = nextLayer;
        }

        return layer[0];
    }

    getProof(index) {
        let proof = [];
        let layer = this.leaves;
        let currentIndex = index;

        while (layer.length > 1) {
            const isLeftNode = currentIndex % 2 === 0;
            const siblingIndex = isLeftNode
                ? currentIndex + 1
                : currentIndex - 1;

            if (siblingIndex < layer.length) {
                proof.push({
                    data: layer[siblingIndex],
                    left: !isLeftNode
                });
            }

            currentIndex = Math.floor(currentIndex / 2);

            const nextLayer = [];
            for (let i = 0; i < layer.length; i += 2) {
                const left = layer[i];
                const right = layer[i + 1];

                if (right !== undefined) {
                    nextLayer.push(this.concat(left, right));
                } else {
                    nextLayer.push(left);
                }
            }

            layer = nextLayer;
        }

        return proof;
    }
}
