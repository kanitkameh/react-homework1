import React, { useState, ChangeEvent, FormEvent } from "react";
import { recipeRepository } from "./RecipeRepository";
import { Product, Recipe } from "./Recipe";

export function AddRecipeForm() {
  const [recipeData, setRecipeData] = useState({
    author: "",
    name: "",
    shortDescription: "",
    preparationTimeInMinutes: "",
    products: [] as Product[],
    photo: "",
    description: "",
    tags: [] as string[],
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
    const recipe: Recipe = {
      ...recipeData,
      preparationTimeInMinutes: parseInt(recipeData.preparationTimeInMinutes),
      shareTime: new Date(),
      modificationTime: new Date(),
      photo: new URL(recipeData.photo)
    };
    recipeRepository.addRecipe(recipe);
    // Reset form data
    setRecipeData({
      author: "",
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
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={recipeData.author}
          onChange={handleChange}
        />
      </label>
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
      <button type="submit">Add Recipe</button>
    </form>
  );
}
