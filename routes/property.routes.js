import { Router } from "express";


const propertyRouter = Router();

propertyRouter.get('/', (req, res) => res.send({ title: 'Get all properties endpoint' }));

propertyRouter.get('/:id', (req, res) => res.send({ title: 'Get property by ID endpoint' }));

propertyRouter.post('/', (req, res) => res.send({ title: 'Create new property endpoint' }));

propertyRouter.put('/:id', (req, res) => res.send({ title: 'Update property by ID endpoint' }));

propertyRouter.delete('/:id', (req, res) => res.send({ title: 'Delete property by ID endpoint' }));

propertyRouter.get('/user/:id', (req, res) => res.send({ title: 'Get all user properties by their ID endpoint' }))

propertyRouter.put('/:id/bookmark', (req, res) => res.send({ title: 'Bookmark property by its ID' }))



export default propertyRouter;