class Product {
    constructor(name: String){}
}
export class Recipe{
    constructor(
            id: string, //идентификатор на рецептата (до 24 символа);
            author: string, //идентификатор на потребителя споделил рецептата (до 24 символа);
            name: string, //име на рецептата (до 80 символа);
            shortDescription: string, //кратко описание на рецептата (до 256 символа);
            preparationTimeInMinutes: number, //време за приготвяне (в минути);
            products: [Product], //използвани продукти (списък от продукти);
            photo: URL, //снимка на резултата от рецептата (валиден URL, задължителен атрибут);
            description: string, //подробно описание (до 2048 символа);
            tags: [String], //ключови думи - tags (списък от тагове);
            shareTime: Date, //дата и час на споделяне (генерира се автоматично);
            modificationTime: Date) //дата и час на последна модификация (генерира се автоматично);
    {}

}
