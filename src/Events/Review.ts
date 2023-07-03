export class Review {
    authorId: string
    stars: number
    text: string
    constructor(
        authorId: string,
        stars: number,
        text: string,
    ){
        this.authorId = authorId
        this.stars = stars
        this.text = text    
    }
}