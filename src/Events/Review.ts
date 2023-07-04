import * as yup from 'yup';

export class ReviewDTO {
    constructor(
        public authorId: string,
        public stars: number,
        public text: string,
    ){}
}
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
export const reviewSchema = yup.object().shape({
  authorId: yup.string().required(),
  stars: yup.number().required().min(1).max(5),
  text: yup.string().required(),
});
    
export const reviewDtoSchema = yup.object().shape({
  stars: yup.number().required().min(1).max(5),
  text: yup.string().required(),
});