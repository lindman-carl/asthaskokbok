import React from "react";
import { Recipe } from "@prisma/client";

type RecipeProps = {
  recipe: Recipe;
};

const Recipe: React.FC<RecipeProps> = ({ recipe: { title, content } }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Recipe;
