import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleRecipeThunk } from "../../store/recipes";
import { editRecipeThunk } from "../../store/recipes";
import "./RecipeDetailPage.css";

const RecipeDetailPage = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();

    const recipe = useSelector((state) => state.recipes.singleRecipe);
    const instructions = recipe.instructions;
    const splittedInstructions = instructions?.split("Step ");

    const stepsArr = splittedInstructions?.filter(
        (instruction) => instruction.length > 1
    );

    const parsedSteps = [];
    for (let i = 0; i < stepsArr?.length; i++) {
        let step = stepsArr[i].substring(3);
        parsedSteps.push(step);
    }

    useEffect(() => {
        dispatch(getSingleRecipeThunk(+recipeId));
    }, [dispatch, recipeId]);

    const handleEdit = async (e) => {
        history.push(`/recipes/edit/${recipeId}`)
    }

    if (!recipe) return null;

    return (
        <>
            <div className="recipe-detail-page-wrapper">
                <div className="recipe-detail-page-top-container">
                    <div className="recipe-detail-page-name-pic-container">
                        <div className="recipe-detail-name-author-container">
                            <div className="recipe-detail-name-header">
                                {recipe.name}
                            </div>

                            <div className="recipe-detail-author">
                                By *AUTHOR NAME*
                            </div>
                            <span>
                                <button onClick={handleEdit}>
                                    Edit
                                </button>
                            </span>
                        </div>

                        {/* <div className="recipe-detail-pic-container"> */}
                        <img
                            src={recipe.preview_img}
                            className="recipe-detail-image"
                        />
                        {/* </div> */}
                    </div>
                    <div className="recipe-detail-details-desc-container">
                        <div className="recipe-detail-stats-container">
                            <div className="recipe-detail-stats">
                                <dt className="stat-label">Time</dt>
                                <dd className="stat-value">
                                    {recipe.prep_time}
                                </dd>
                                <dt className="stat-label">Rating</dt>
                                <dd className="stat-value">*RECIPE RATING*</dd>
                                <dt className="stat-label">Difficulty</dt>
                                <dd className="stat-value">
                                    {recipe.difficulty}
                                </dd>
                            </div>
                        </div>

                        <div className="recipe-detail-description-container">
                            <div className="recipe-detail-description">
                                {recipe.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="recipe-detail-page-middle-container">
                    <div className="recipe-detail-page-ingredients-instructions-container">
                        <div className="recipe-detail-page-ingredients-container">
                            <div className="recipe-detail-page-ingredients-header">
                                INGREDIENTS
                            </div>

                            <div className="recipe-detail-page-ingredients-yield">
                                *yield: 2 servings*
                            </div>

                            <div className="recipe-detail-page-ingredients-list-container">
                                <div>apple</div>
                                <div>orange</div>
                                <div>grape</div>
                                <div>pear</div>
                                <div>cherry</div>
                                <div>kiwi</div>
                            </div>
                        </div>

                        <div className="recipe-detail-page-instructions-container">
                            <div className="recipe-detail-page-instructions-header">
                                PREPARATION
                            </div>

                            <div className="recipe-detail-page-instructions-steps-container">
                                <div className="recipe-detail-page-single-step-container">
                                {parsedSteps.map((step, idx) => (
                                    <>
                                    <div className="recipe-detail-page-single-step">
                                        Step {idx + 1}:
                                    </div>
                                    <div className="recipe-detail-page-single-step-text">
                                        {step}
                                    </div>
                                    </>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeDetailPage;
