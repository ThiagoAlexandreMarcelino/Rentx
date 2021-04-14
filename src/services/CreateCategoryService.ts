import { CategoriesRepositories } from "../repositories/CategoriesRepositories";

interface IRequest{
    name: string;
    description: string;
}

class CreateCategoryService{

constructor(private categoriesRepository : CategoriesRepositories){

}
    execute({name,description}: IRequest):void{
        const categoryAlredyExists = this.categoriesRepository.findByname(name);

        if(categoryAlredyExists){
            throw new Error("Category Alredy Exists")
        }

        this.categoriesRepository.create({name,description});
    }

}

export {CreateCategoryService}