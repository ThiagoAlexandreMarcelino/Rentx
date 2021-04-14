import { Category } from '../models/Category';

interface ICreateCategoryDTO{
    name:string;
    description:string
}

class CategoriesRepositories{
    private categories: Category[];

    constructor(){
        this.categories = [];
    }

    create({name,description}: ICreateCategoryDTO) :void{
        const category = new Category() 
        
        Object.assign(category,{
            name,
            description,
            created_at: new Date()
        })
        
    this.categories.push(category);
    }

    list(): Category[]{
        return this.categories;
    }

    findByname(name: string): void | Category{
        
        const category = this.categories.find(category => category.name === name);
        
        if(category){
            return category;    
        }
        
    }
    
}

export {CategoriesRepositories}