import { Router } from "express";


const listingRouter = Router();

listingRouter.get('/', (req, res) => res.send({ title: 'Get all listings endpoint' }));

listingRouter.get('/:id', (req, res) => res.send({ title: 'Get listing by ID endpoint' }));

listingRouter.post('/', (req, res) => res.send({ title: 'Create new listing endpoint' }));

listingRouter.put('/:id', (req, res) => res.send({ title: 'Update listing by ID endpoint' }));

listingRouter.delete('/:id', (req, res) => res.send({ title: 'Delete listing by ID endpoint' }));

listingRouter.get('/user/:id', (req, res) => res.send({ title: 'Get all user listings by their ID endpoint' }))

listingRouter.put('/:id/bookmark', (req, res) => res.send({ title: 'Bookmark listing by its ID' }))



export default listingRouter;