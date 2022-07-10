const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    subscription: {
        type: Object,
        required: true,
    },
})

mongoose.model('Subscriptions',subscriptionSchema)