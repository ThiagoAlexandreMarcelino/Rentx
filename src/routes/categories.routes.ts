import { Router } from 'express';

const categoriesRoutes = Router();

import {CategoriesRepositories} from '../repositories/CategoriesRepositories'
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRepository = new CategoriesRepositories();

categoriesRoutes.post("/", (request,response)=>{
    const {name, description} = request.body; 

    const createCategoryService = new CreateCategoryService(categoriesRepository);

    createCategoryService.execute({name,description});

return response.status(201).send();
});

categoriesRoutes.get("/", (request,response)=>{
    const all = categoriesRepository.list();

    return response.status(201).json(all);
})

export {categoriesRoutes};