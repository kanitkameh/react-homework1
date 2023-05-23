import React, { useState, ChangeEvent, FormEvent } from "react";
import { recipeRepository } from "./RecipeRepository";
import { IdentifiableRecipe, Product, Recipe } from "./Recipe";
import { getLoginStatus } from "../Authentication/AuthenticationService";
import { userRepository } from "../Users/UserRepository";
import { useLoaderData, useNavigate } from "react-router-dom";
import { IdentifiableUser } from "../Users/User";

export function EditRecipeForm() {
  const navigate = useNavigate();
  const { recipe, userId } = useLoaderData() as { recipe: IdentifiableRecipe , userId: string};
  if(userId == null){
    navigate("/");
  }

  const [recipeData, setRecipeData] = useState({
    name: recipe.name,
    shortDescription: recipe.description,
    preparationTimeInMinutes: recipe.preparationTimeInMinutes.toString(),
    products: recipe.products,
    photo: recipe.photo.toString(),
    description: recipe.description,
    tags: recipe.tags,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleProductChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = event.target;
    setRecipeData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index] = new  Product(value);
      return {
        ...prevData,
        products: updatedProducts,
      };
    });
  }

  function handleTagChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const { value } = event.target;
    setRecipeData((prevData) => {
      const updatedTags = [...prevData.tags];
      updatedTags[index] = value;
      return {
        ...prevData,
        tags: updatedTags,
      };
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const updatedRecipe: IdentifiableRecipe = {
      id: recipe.id,
      ...recipeData,
      author: userId, // User should be redirected if not logged in
      preparationTimeInMinutes: parseInt(recipeData.preparationTimeInMinutes),
      shareTime: new Date(),
      modificationTime: new Date(),
      photo: new URL(recipeData.photo)
    };
    recipeRepository.addRecipe(updatedRecipe);
    // Reset form data
    setRecipeData({
      name: "",
      shortDescription: "",
      preparationTimeInMinutes: "",
      products: [],
      photo: "",
      description: "",
      tags: [],
    });
  }

  function handleAddProduct() {
    setRecipeData((prevData) => ({
      ...prevData,
      products: [...prevData.products, new Product("")],
    }));
  }

  function handleRemoveProduct(index: number) {
    setRecipeData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts.splice(index, 1);
      return {
        ...prevData,
        products: updatedProducts,
      };
    });
  }

  function handleAddTag() {
    setRecipeData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, ""],
    }));
  }

  function handleRemoveTag(index: number) {
    setRecipeData((prevData) => {
      const updatedTags = [...prevData.tags];
      updatedTags.splice(index, 1);
      return {
        ...prevData,
        tags: updatedTags,
      };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={recipeData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Short Description:
        <input
          type="text"
          name="shortDescription"
          value={recipeData.shortDescription}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Preparation Time (in minutes):
        <input
          type="number"
          name="preparationTimeInMinutes"
          value={recipeData.preparationTimeInMinutes}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Products:
        {recipeData.products.map((product, index) => (
          <div key={index}>
            <input
              type="text"
              value={product.name} 
              onChange={(event) => handleProductChange(event, index)}
            />
            <button type="button" onClick={() => handleRemoveProduct(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </label>
      <br />
      <label>
        Photo:
        <input
          type="text"
          name="photo"
          value={recipeData.photo}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={recipeData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Tags:
        {recipeData.tags.map((tag, index) => (
          <div key={index}>
            <input
              type="text"
              value={tag}
              onChange={(event) => handleTagChange(event, index)}
            />
            <button type="button" onClick={() => handleRemoveTag(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddTag}>
          Add Tag
        </button>
      </label>
      <br />
      <button type="submit">Edit Recipe</button>
    </form>
  );
}
