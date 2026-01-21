import mongoose from "mongoose";

const { Schema } = mongoose;


const ListingDetailsSchema = new Schema({
  desc: {
        type: String,
        required: true
    },
    utilities: {
        type: String
    },
    pet: {
        type: String
    },
    income: {
        type: String
    },
    size: {
        type: Number
    },
    school: {
        type: Number
    },
    bus: {
        type: Number
    },
    restaurant: {
        type: Number
    }
}, { _id: false });




const listingSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true,
        get: function(value) {
            return value ? value.toLocaleString() : value;
        }
    },
    images : {
        type: [String],
        required: true
    },
    address : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    bedroom : {
        type: Number,
        required: true
    },
    bathroom : {
        type: Number,
        required: true
    },
    latitude : {
        type: String,
        required: true
    },
    longitude : {
        type: String,
        required: true
    },
    listingType: { // sell or rent
    type: String,
    enum: ["buy", "rent"],
    required: true,
    },
    propertyType: { 
    type: String,
    enum: ["apartment", "house", "condo", "land", "any", "villa", "townhouse", "farmhouse", "duplex", "studio", "office", "maisonette", "cottage", "chalet", "bungalow", "loft", "penthouse", "mansion", "cabin"],
    default: "any"
    },
    userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true },
    listingDetails: ListingDetailsSchema
}, { 
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
})



const Listing = mongoose.model('Listing', listingSchema);

export default Listing;