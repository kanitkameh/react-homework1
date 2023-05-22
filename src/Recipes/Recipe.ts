class Product {
    name: String
    constructor(name: String) { 
        this.name = name;
    }
}
export class Recipe {
    author: string; //идентификатор на потребителя споделил рецептата (до 24 символа);
    name: string; //име на рецептата (до 80 символа);
    shortDescription: string; //кратко описание на рецептата (до 256 символа);
    preparationTimeInMinutes: number; //време за приготвяне (в минути);
    products: [Product]; //използвани продукти (списък от продукти);
    photo: URL; //снимка на резултата от рецептата (валиден URL, задължителен атрибут);
    description: string; //подробно описание (до 2048 символа);
    tags: [String]; //ключови думи - tags (списък от тагове);
    shareTime: Date; //дата и час на споделяне (генерира се автоматично);
    modificationTime: Date; //дата и час на последна модификация (генерира се автоматично);
    constructor(
        author: string, 
        name: string, 
        shortDescription: string, 
        preparationTimeInMinutes: number, 
        products: [Product], 
        photo: URL, 
        description: string, 
        tags: [String], 
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
    id: string; //идентификатор на рецептата (до 24 символа);
    constructor(
        id: string, 
        author: string, 
        name: string, 
        shortDescription: string, 
        preparationTimeInMinutes: number, 
        products: [Product], 
        photo: URL, 
        description: string, 
        tags: [String], 
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
            this.id = id
    }

}