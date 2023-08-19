import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    status: {
        type: String
    },
    imported_t: {
        type: Date,
        default: new Date()
    },
    url: {
        type: String
    },
    creator: {
        type: String
    },
    created_t: {
        type: Number
    },
    last_modified_t: {
        type: Number
    },
    product_name: {
        type: String
    },
    quantity: {
        type: String
    },
    brands: {
        type: String
    },
    categories: {
        type: String
    },
    labels: {
        type: String
    },
    cities: {
        type: String
    },
    purchase_places: {
        type: String
    },
    stores: {
        type: String
    },
    ingredients_text: {
        type: String
    },
    traces: {
        type: String
    },
    serving_size: {
        type: String
    },
    serving_quantity: {
        type: Number
    },
    nutriscore_score: {
        type: Number
    },
    nutriscore_grade: {
        type: String
    },
    main_category: {
        type: String
    },
    image_url: {
        type: String
    }
})

const Products = mongoose.model("Products", productsSchema)

export {Products}
