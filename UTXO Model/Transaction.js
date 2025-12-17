class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }

    execute() {
        for (const utxo of this.inputUTXOs){
            if(utxo.spent){
                throw new Error("Input UTXO already spent");
            }
        }

        let totalInputValue = 0;
        for(const utxo of this.inputUTXOs){
            totalInputValue += utxo.amount;
        }

        let totalOutputValue = 0;
        for(const utxo of this.outputUTXOs){
            totalOutputValue += utxo.amount;
        }

        if(totalInputValue < totalOutputValue){
            throw new Error("Input value is less than output value");
        }

        for(const utxo of this.inputUTXOs){
            utxo.spend();
        }

        this.fee = totalInputValue - totalOutputValue;
    }
}
