const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    tariffItem: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rodtepRate: {
        type: Number,
        required: true
    },
    uqc: {
        type: String,
        required: true
    },
    cap: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    incentive: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
