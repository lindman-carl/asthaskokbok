import React, { useEffect, useState } from "react";
import { Recipe } from "@prisma/client";
import markdownToHtml from "../utils/markdownToHtml";

type RecipeProps = {
  recipe: Recipe;
};

const Recipe: React.FC<RecipeProps> = ({ recipe: { title, content } }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  useEffect(() => {
    const convertContent = async () => {
      const convertedContent = await markdownToHtml(content);
      setHtmlContent(convertedContent);
    };

    convertContent();
  }, [content]);

  return (
    <div>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Recipe;
