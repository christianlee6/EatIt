import React from "react";
import { Link } from "react-router-dom";
import "./RecipeDetailCard.css";

const RecipeDetailCard = ({ recipe }) => {
    if (!recipe) return null;
    console.log("recipe", recipe);

    return (
        <div className="recipe-detail-card-wrapper">
            <Link
                to={`/recipes/${recipe.id}`}
                style={{ textDecoration: "none", color: "black" }}
            >
                <div className="recipe-detail-card-image-container">
                    <img
                        src={recipe.preview_img}
                        className="recipe-detail-card-image"
                    />
                </div>

                <div className="recipe-detail-card-detail-container">
                    <div className="recipe-detail-card-name-container">
                        <div className="recipe-detail-card-name">
                            {recipe.name}
                        </div>
                        <div className="recipe-detail-card-prep-time">
                            {recipe.prep_time} minutes <i class="fa-regular fa-clock"></i>
                        </div>
                    </div>

                    <div className="difficulty-rating">
                        <div className="recipe-detail-card-difficulty">
                            Difficulty: {recipe.difficulty} <i class="fa-solid fa-ice-cream"></i>
                        </div>


                        <div className="recipe-detail-card-rating">
                            {recipe.avg_rating === 100 ? (<>Rating: n/a</>) : (<>Rating: {recipe.avg_rating.toFixed(1)}</>)}
                        </div>

                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecipeDetailCard;
