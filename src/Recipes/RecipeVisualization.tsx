import { IdentifiableRecipe } from "./Recipe";
import './recipe.css'

type RecipeProps = {
  recipe: IdentifiableRecipe;
};

export function RecipeVisualization({ recipe }: RecipeProps) {
  return (
    <div>
        <hr></hr>
      <h2>{recipe.name}</h2>
      <p>Author: {recipe.author}</p>
      <p>Short Description: {recipe.shortDescription}</p>
      <p>Preparation Time: {recipe.preparationTimeInMinutes} minutes</p>
      <p>Products:</p>
      <ul>
        {recipe.products.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
      <img className="recipe-image" src={recipe.photo.toString()} alt="Recipe" />
      <p>Description: {recipe.description}</p>
      <p>Tags: {recipe.tags.join(", ")}</p>
      <p>Share Time: {recipe.shareTime.toString()}</p>
      <p>Modification Time: {recipe.modificationTime.toString()}</p>

      <a href={"/recipes/"+recipe._id}>Edit</a>
      {/* <Link to={recipe.id}>Edit</Link> */}
        <hr></hr>
    </div>
  );
}
