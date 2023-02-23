import React from "react"
import { Link } from "react-router-dom"
import "./RecipeDetailCard.css"

const RecipeDetailCard = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-detail-card-wrapper">
            <li>
                {recipe.name}
            </li>
        </div>
    )
}

export default RecipeDetailCard;
