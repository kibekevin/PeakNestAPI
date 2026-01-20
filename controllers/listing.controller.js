import Listing from "../models/listing.model.js";


export const getListings = async (req, res, next) => {
    try {
        const query = req.query;
        console.log(query) 

        //Get listings logic
        const filter = {};

        // City
        if (query.city) {
        filter.city = new RegExp(`${query.city}`, "i");
        }

        // Listing type
        if (query.listingType) {
        filter.listingType = new RegExp(`^${query.listingType}$`, "i");
        }

        // Property type
        if (query.propertyType) {
        filter.propertyType = new RegExp(`^${query.propertyType}$`, "i");
        }

        // Bedroom (allow 0 or any number)
        if (query.bedroom !== undefined && query.bedroom !== "") {
        filter.bedroom = Number(query.bedroom);
        }

        // Price range
        filter.price = {
        $gte: Number(query.minPrice || 0),
        $lte: Number(query.maxPrice || 1000000000)
        };

        const listings = await Listing.find(filter);


        if (!listings) {
            const error = new Error('Unable to retrieve listings')
            error.status = 404 //Not Found
            throw(error)
        }

        res.status(200).json({
            success: true,
            message: 'Listings retrieved successfully',
            data: { listings }
        })
    } catch (error) {
        next(error)
    }
}




export const getListing = async (req, res, next) => {

    try {
        //Get listing by ID logic
        const listing = await Listing.findById(req.params.id).populate('userId', 'name email avatar')
        

        if (!listing) {
            const error = new Error('listing not found');
            error.status = 404 //Not Found
            throw(error);
        }


        res.status(200).json({
            success: true,
            message: 'listing retrieved successfully',
            data: { listing }
        })
    } catch (error) {
        next(error)
    }
}






export const addListing = async (req, res, next) => {
    //Add listing logic
    const {listingData, listingDetails} = req.body;
    const tokenUserId = req.user._id.toString()

    try {
        const newListing = await Listing.create({
            ...listingData,
            userId: tokenUserId,
            listingDetails
            
        })

        res.status(200).json({
            success: true,
            message: 'listing added successfully',
            data: { newListing }
        })
    } catch (error) {
        next(error)
    }
}




export const updateListing = async (req, res, next) => {
    try {
        //Update listing logic

        res.status(200).json()
    } catch (error) {
        next(error)
    }
}





export const deleteListing = async (req, res, next) => {
    //Delete listing logic
    const id = req.params.id;
    const tokenUserId = req.user._id.toString()
    
    try {
        const listing = await Listing.findById(id)
        const listingUserId = listing.userId.toString()

        if (listingUserId !== tokenUserId) {
            const error = new Error('Not Authorized to delete listing');
            error.status = 403
            throw(error)

            
        }

        await Listing.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'listing deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}