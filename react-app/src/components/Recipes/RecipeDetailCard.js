import React from "react";
import { Link } from "react-router-dom";
import "./RecipeDetailCard.css";

const RecipeDetailCard = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-detail-card-wrapper">
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration:"none", color: "black" }}>

            <div className="recipe-detail-card-image-container">
                <img src={recipe.preview_img} className="recipe-detail-card-image" />
            </div>

            <div className="recipe-detail-card-detail-container">
                <div className="recipe-detail-card-name-container">
                    <div className="recipe-detail-card-name">
                        {recipe.name}
                    </div>
                </div>

                <div className="recipe-detail-card-creator-name">
                    {recipe.creator?.first_name} {recipe.creator?.last_name}
                </div>

                <div className="recipe-detail-card-prep-time">
                    {recipe.prep_time} minutes
                </div>

                <div className="recipe-detail-card-difficulty">
                    Difficulty: {recipe.difficulty}
                </div>

                <div className="recipe-detail-card-rating">
                    Rating: {recipe.avg_rating}
                </div>
            </div>
            </Link>
        </div>
    );
};

export default RecipeDetailCard;
