import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addListing, deleteListing, getListing, getListings, updateListing } from "../controllers/listing.controller.js";


const listingRouter = Router();

listingRouter.get('/', getListings);

listingRouter.get('/:id', getListing);

listingRouter.post('/', authorize ,addListing);

listingRouter.put('/:id', authorize ,updateListing);

listingRouter.delete('/:id', authorize ,deleteListing);

listingRouter.get('/user/:id', (req, res) => res.send({ title: 'Get all user listings by their ID endpoint' }))

listingRouter.put('/:id/bookmark', authorize ,(req, res) => res.send({ title: 'Bookmark listing by its ID' }))



export default listingRouter;