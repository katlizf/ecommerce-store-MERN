module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {}
    this.totalQty = oldCart.totalQty || 0
    this.totalPrice = oldCart.totalPrice || 0

    this.add = function(item, id) {
        let storedItem = this.items[id]
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
            // creating a new entry
        }
        storedItem.qty++
        storedItem.price = storedItem.price * storedItem.qty
        this.totalQty++
        this.totalPrice += storedItem.price
    }

    this.generateArray = function() {
        let arr = []
        for (let id in this.items) {
            arr.push(this.items[id])
        }
        return arr
        // to output list of product groups
    }
}
// create a new cart off the old cart when adding a new item to check if the same item id already exists then only update the qunatity instead of pushing the item

// const mongoose = require("mongoose")
// const uniqueValidator = require("mongoose-unique-validator")

// const Schema = mongoose.Schema

// const cartSchema = new Schema({
// 	productId: {type: mongoose.Types.ObjectId, ref: "Product", require: true},
// 	userId: {type: mongoose.Types.ObjectId, ref: "User", require: true},
//     quantity: {type: Number, require: true},
//     size: {type: String}
// })

// cartSchema.plugin(uniqueValidator)

// module.exports = mongoose.model("Cart", cartSchema)