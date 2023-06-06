import { ObjectId } from "mongodb";
import { RecipeVisualization } from "./RecipeVisualization";

export class Product {
    name: string
    constructor(name: string) { 
        this.name = name;
    }
}
export class Recipe {
    author: string; //идентификатор на потребителя споделил рецептата (до 24 символа);
    name: string; //име на рецептата (до 80 символа);
    shortDescription: string; //кратко описание на рецептата (до 256 символа);
    preparationTimeInMinutes: number; //време за приготвяне (в минути);
    products: Product[]; //използвани продукти (списък от продукти);
    photo: URL; //снимка на резултата от рецептата (валиден URL, задължителен атрибут);
    description: string; //подробно описание (до 2048 символа);
    tags: string[]; //ключови думи - tags (списък от тагове);
    shareTime: Date; //дата и час на споделяне (генерира се автоматично);
    modificationTime: Date; //дата и час на последна модификация (генерира се автоматично);
    constructor(
        author: string, 
        name: string, 
        shortDescription: string, 
        preparationTimeInMinutes: number, 
        products: Product[], 
        photo: URL, 
        description: string, 
        tags: string[], 
        shareTime: Date, 
        modificationTime: Date) 
    {
        this.author = author;    
        this.name = name;    
        this.shortDescription = shortDescription;    
        this.preparationTimeInMinutes = preparationTimeInMinutes;    
        this.products = products;    
        this.photo = photo;    
        this.description = description;    
        this.tags = tags;    
        this.shareTime = shareTime;    
        this.modificationTime = modificationTime;    
    }

}

export class IdentifiableRecipe extends Recipe {
    _id: string; //идентификатор на рецептата (до 24 символа);
    constructor(
        _id: string, 
        author: string, 
        name: string, 
        shortDescription: string, 
        preparationTimeInMinutes: number, 
        products: Product[], 
        photo: URL, 
        description: string, 
        tags: string[], 
        shareTime: Date, 
        modificationTime: Date) 
    {
        super(
            author,
            name,
            shortDescription,
            preparationTimeInMinutes,
            products,
            photo,
            description,
            tags,
            shareTime,
            modificationTime);
            this._id = _id
    }

}

// TODO add more checks?
export function validateRecipe(recipe: any){
    let isRecipeProblems = isRecipe(recipe)
    if(isRecipeProblems.length === 0) {
        return validateRecipeFields(recipe as Recipe);
    }
    return isRecipeProblems
}

function validateRecipeFields(recipe: Recipe){
    let problems = []
    if(recipe.name.length > 80){
        problems.push("recipe name too long")
    }
    if(recipe.author.length > 24){
        problems.push("authorId too long")
    }
    return problems
}

function isRecipe(recipe: any){
    let problems = []
    if(!(recipe.author && typeof(recipe.author) == 'string')){
            problems.push("author isn't a string")
    }

    if(!(recipe.name && typeof(recipe.name) == 'string')){
            problems.push("name isn't a string")
    }

    if(!(recipe.shortDescription && typeof(recipe.shortDescription) == 'string')){
            problems.push("shortDescription isn't a string")
    }

    if(!(recipe.preparationTimeInMinutes && typeof(recipe.preparationTimeInMinutes) == 'number')){
            problems.push("preparationTimeInMinutes isn't a number")
    }
    return problems
}