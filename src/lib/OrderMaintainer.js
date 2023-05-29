class OrderMaintainer {
    constructor({ callback }) {
        this.callback = callback;
        this.reset();
    }

    addData(data, order) {
        // console.log(order, this.nextSentenceNumber);
        if (order === this.nextSentenceNumber) {
            this.callback(data);
            this.nextSentenceNumber++;
            while (this.buffer.has(this.nextSentenceNumber)) {
                this.callback(this.buffer.get(this.nextSentenceNumber));
                this.nextSentenceNumber++;
            }
        } else {
            this.buffer.set(order, data);
        }
    }

    reset() {
        this.nextSentenceNumber = 0;
        this.buffer = new Map();
    }
}

export default OrderMaintainer;
