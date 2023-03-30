import React, { useEffect, useState, useRef } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllRecipesThunk, getSingleRecipeThunk } from "../../store/recipes";
import { editRecipeThunk } from "../../store/recipes";
import { getRecipeReviewsThunk } from "../../store/reviews";
import { createReviewThunk } from "../../store/reviews";
import { getSingleReviewThunk } from "../../store/reviews";
import { deleteRecipeThunk } from "../../store/recipes";
import CreateReviewForm from "../ReviewForm/CreateReviewForm";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewForm/EditReviewForm";
import AllReviews from "../Reviews/AllReviews";
import "./RecipeDetailPage.css";

const RecipeDetailPage = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();

    const user = useSelector((state) => state.session.user);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [hoverFill, setHoverFill] = useState(null);
    const [createdAt, setCreatedAt] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const reviews = useSelector((state) => state.reviews.recipe);
    const reviewsArr = Object.values(reviews);
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    console.log("recipe", recipe);

    const ingredients = recipe.ingredients;
    console.log("ingredients", ingredients);
    const splitIngredients = ingredients?.split(".");
    // console.log("splitIngredients", splitIngredients);

    let avgRating = 0;
    let sum = 0;
    let length = reviewsArr.length;
    reviewsArr.forEach((review) => {
        sum += review?.rating;
    });
    avgRating = (sum / length).toFixed(1);
    // console.log("avgRating", avgRating);

    const instructions = recipe.instructions;
    console.log("instructions", instructions);
    const splittedInstructions = instructions?.split("Step ");
    console.log("splittedInstructions", splittedInstructions);

    const stepsArr = splittedInstructions?.filter(
        (instruction) => instruction.length > 1
    );
    console.log("stepsArr", stepsArr);

    const parsedSteps = [];
    for (let i = 0; i < stepsArr?.length; i++) {
        let step = stepsArr[i].substring(3);
        parsedSteps.push(step);
    }
    console.log("parsedSteps", parsedSteps);

    useEffect(() => {
        dispatch(getSingleRecipeThunk(+recipeId)).then(
            dispatch(getRecipeReviewsThunk(+recipeId))
        );
    }, [dispatch, recipeId]);

    const handleRecipeEdit = async (e) => {
        history.push(`/recipes/edit/${recipeId}`);
    };

    const handleRecipeDelete = async (e) => {
        if (
            window.confirm(
                "Are you sure you would like to delete this recipe? You cannot undo this action."
            )
        ) {
            dispatch(deleteRecipeThunk(recipeId)).then(history.push("/"));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = [];
        setHasSubmitted(true);

        const reviewInfo = {
            reviewer_id: user?.id,
            recipe_id: +recipeId,
            review,
            rating: rating,
            created_at: new Date(),
            updated_at: null,
        };

        if (!rating) {
            errorsArr.push("Please include a star rating with your review.");
        }
        if (!review) {
            errorsArr.push("Please include text with your review.");
        }
        if (review.length > 250) {
            errorsArr.push("Review must be less than 250 characters long.");
        }
        console.log("errorsArr", errorsArr);
        setErrors(errorsArr);
        console.log("errors", errors);
        if (errorsArr.length === 0) {
            dispatch(createReviewThunk(reviewInfo));
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        setReview("");
        setErrors([]);
    };

    const handleClear = async (e) => {
        e.preventDefault();
        setRating(null);
    };

    return (
        <>
            <div class="parent">
                <div class="div1">
                    <div className="recipe-detail-name-author-container">
                        <div className="recipe-detail-name-header">
                            {recipe.name}
                        </div>

                        <div className="recipe-detail-author">
                            By {recipe.creator?.first_name}{" "}
                            {recipe.creator?.last_name}
                        </div>
                        <div className="recipe-detail-options">
                            {recipe?.creator?.id === user?.id ? (
                                <div className="recipe-options-container">
                                    <div>
                                        This is your recipe. You can edit or
                                        delete it.
                                    </div>
                                    <div className="recipe-option-buttons">
                                        <button
                                            className="review-buttons"
                                            onClick={handleRecipeEdit}
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="review-buttons"
                                            onClick={handleRecipeDelete}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div class="div2">
                    <div className="recipe-detail-pic-container">
                        <img
                            src={recipe.preview_img}
                            className="recipe-detail-image"
                        />
                    </div>
                </div>
                <div class="div3">
                    <div className="recipe-detail-stats-container">
                        <div className="recipe-detail-stats">
                            <dt className="stat-label">Time</dt>
                            <dd className="stat-value">
                                {recipe.prep_time} minutes
                            </dd>
                            <dt className="stat-label">Rating</dt>
                            <dd className="stat-value">
                                <>
                                    {isNaN(avgRating) ? (
                                        <div>None</div>
                                    ) : (
                                        avgRating
                                    )}
                                </>
                            </dd>
                            <dt className="stat-label">Difficulty</dt>
                            <dd className="stat-value">{recipe.difficulty}</dd>
                        </div>
                    </div>
                </div>
                <div class="div4">
                    <div className="recipe-detail-description-container">
                        <div className="recipe-detail-description">
                            {recipe.description}
                        </div>
                    </div>
                </div>
                <div class="div5">
                    <div className="recipe-detail-page-ingredients-container">
                        <div className="recipe-detail-page-ingredients-header">
                            INGREDIENTS
                        </div>

                        <div className="recipe-detail-page-ingredients-yield">
                            Yield: {recipe.servings} servings
                        </div>

                        <div className="recipe-detail-page-ingredients-list-container">
                            {splitIngredients?.map((ingredient, idx) => (
                                <>
                                    <div className="recipe-detail-page-single-ingredient">
                                        {ingredient}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="div6">
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
                <div className="div7">
                    <div className="recipe-detail-page-ingredients-container">
                        <div className="recipe-detail-page-ingredients-header">
                            RATINGS
                        </div>

                        <div className="recipe-detail-page-ingredients-yield">
                            <div>
                                <i class="fa-solid fa-star" />
                            </div>
                            <div className="recipe-detail-page-ratings-info">
                                <div>
                                    {isNaN(avgRating) ? (
                                        <div>No rating</div>
                                    ) : (
                                        <div>{avgRating} out of 5</div>
                                    )}
                                </div>
                                <div>{reviewsArr.length} reviews</div>
                            </div>
                        </div>

                        <div className="recipe-detail-page-your-rating-container">
                            <div className="your-rating-clear">
                                <div>Your rating</div>
                                <div
                                    onClick={handleClear}
                                    className="clear-button"
                                >
                                    Clear
                                </div>
                            </div>
                            <div className="star">
                                {[...Array(5)].map((_, idx) => {
                                    let ratingValue = idx + 1;
                                    return (
                                        <button
                                            key={idx}
                                            onMouseEnter={() =>
                                                setHoverFill(ratingValue)
                                            }
                                            onMouseLeave={() =>
                                                setHoverFill(null)
                                            }
                                            onClick={() =>
                                                setRating(ratingValue)
                                            }
                                        >
                                            <i
                                                className="fa-solid fa-star "
                                                size={80}
                                                style={{
                                                    color:
                                                        ratingValue <=
                                                        (hoverFill || rating)
                                                            ? "#A7727D"
                                                            : "#ccc",
                                                }}
                                                onChange={() =>
                                                    setRating(ratingValue)
                                                }
                                                value={ratingValue}
                                            ></i>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div8">
                    <div className="reviews-container">
                        <div className="recipe-detail-page-instructions-header">
                            REVIEWS
                        </div>

                        <>
                            <div className="add-review-form-container">
                                {!user ? null : (<form
                                    className="add-review-form"
                                    onSubmit={handleSubmit}
                                >
                                    {/* <div>Write A Review For This Recipe</div> */}
                                    <div className="review-validation-errors">
                                        {hasSubmitted &&
                                            errors?.map((error) => (
                                                <div key={error}>{error}</div>
                                            ))}
                                    </div>
                                    <textarea
                                        cols="55"
                                        rows="5"
                                        type="text"
                                        placeholder="Write a review to let the author and other cooks know how this recipe turned out..."
                                        value={review}
                                        // maxLength={"500"}
                                        // minLength={"3"}
                                        onChange={(e) =>
                                            setReview(e.target.value)
                                        }
                                    ></textarea>
                                    <div className="add-review-actions">
                                        <button
                                            className="review-buttons"
                                            type="reset"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="review-buttons"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>)}

                            </div>
                        </>
                        <div>
                            <AllReviews recipe_id={recipeId} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="recipe-detail-page-wrapper">
                <div className="recipe-detail-page-top-container">
                    <div className="recipe-detail-page-name-pic-container">
                        {/* <div className="recipe-detail-name-author-container">
                            <div className="recipe-detail-name-header">
                                {recipe.name}
                            </div>

                            <div className="recipe-detail-author">
                                By {recipe.creator?.first_name}{" "}
                                {recipe.creator?.last_name}
                            </div>
                            <div className="recipe-detail-options">
                                {recipe?.creator?.id === user?.id ? (
                                    <div className="recipe-options-container">
                                        <div>
                                            This is your recipe. You can edit or
                                            delete it.
                                        </div>
                                        <div className="recipe-option-buttons">
                                            <button onClick={handleRecipeEdit}>
                                                Edit
                                            </button>
                                            <button
                                                onClick={handleRecipeDelete}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div> */}

                        {/* <div className="recipe-detail-pic-container">
                            <img
                                src={recipe.preview_img}
                                className="recipe-detail-image"
                            />
                        </div> */}
                    </div>
                    <div className="recipe-detail-details-desc-container">
                        {/* <div className="recipe-detail-stats-container">
                            <div className="recipe-detail-stats">
                                <dt className="stat-label">Time</dt>
                                <dd className="stat-value">
                                    {recipe.prep_time} minutes
                                </dd>
                                <dt className="stat-label">Rating</dt>
                                <dd className="stat-value">
                                    <>
                                        {isNaN(avgRating) ? (
                                            <div>None</div>
                                        ) : (
                                            avgRating
                                        )}
                                    </>
                                </dd>
                                <dt className="stat-label">Difficulty</dt>
                                <dd className="stat-value">
                                    {recipe.difficulty}
                                </dd>
                            </div>
                        </div> */}

                        {/* <div className="recipe-detail-description-container">
                            <div className="recipe-detail-description">
                                {recipe.description}
                            </div>
                        </div> */}
                    </div>
                </div>

                <div className="recipe-detail-page-middle-container">
                    <div className="recipe-detail-page-ingredients-instructions-container">
                        {/* <div className="recipe-detail-page-ingredients-container">
                            <div className="recipe-detail-page-ingredients-header">
                                INGREDIENTS
                            </div>

                            <div className="recipe-detail-page-ingredients-yield">
                                Yield: {recipe.servings} servings
                            </div>

                            <div className="recipe-detail-page-ingredients-list-container">
                                {splitIngredients?.map((ingredient, idx) => (
                                    <>
                                        <div className="recipe-detail-page-single-ingredient">
                                            {ingredient}
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div> */}

                        {/* <div className="recipe-detail-page-instructions-container">
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
                        </div> */}
                    </div>
                </div>
                <div className="recipe-detail-page-middle-container">
                    <div className="recipe-detail-page-ingredients-instructions-container">
                        {/* <div className="recipe-detail-page-ingredients-container">
                            <div className="recipe-detail-page-ingredients-header">
                                RATINGS
                            </div>

                            <div className="recipe-detail-page-ingredients-yield">
                                <div>
                                    <i class="fa-solid fa-star" />
                                </div>
                                <div className="recipe-detail-page-ratings-info">
                                    <div>
                                        {isNaN(avgRating) ? (
                                            <div>No rating</div>
                                        ) : (
                                            <div>{avgRating} out of 5</div>
                                        )}
                                    </div>
                                    <div>{reviewsArr.length} reviews</div>
                                </div>
                            </div>

                            <div className="recipe-detail-page-your-rating-container">
                                <div className="your-rating-clear">
                                    <div>Your rating</div>
                                    <div
                                        onClick={handleClear}
                                        className="clear-button"
                                    >
                                        Clear
                                    </div>
                                </div>
                                <div className="star">
                                    {[...Array(5)].map((_, idx) => {
                                        let ratingValue = idx + 1;
                                        return (
                                            <button
                                                key={idx}
                                                onMouseEnter={() =>
                                                    setHoverFill(ratingValue)
                                                }
                                                onMouseLeave={() =>
                                                    setHoverFill(null)
                                                }
                                                onClick={() =>
                                                    setRating(ratingValue)
                                                }
                                            >
                                                <i
                                                    className="fa-solid fa-star"
                                                    size={80}
                                                    style={{
                                                        color:
                                                            ratingValue <=
                                                            (hoverFill ||
                                                                rating)
                                                                ? "#ffe101"
                                                                : "#ccc",
                                                    }}
                                                    onChange={() =>
                                                        setRating(ratingValue)
                                                    }
                                                    value={ratingValue}
                                                ></i>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div> */}

                        {/* <div className="recipe-detail-page-instructions-container">
                            <div className="recipe-detail-page-instructions-header">
                                REVIEWS
                            </div>

                            <>
                                <div className="recipe-detail-page-add-review-container">
                                    <form onSubmit={handleSubmit}>
                                        <div>Add Review</div>
                                        <div className="validation-errors">
                                            {hasSubmitted &&
                                                errors?.map((error) => (
                                                    <div key={error}>
                                                        {error}
                                                    </div>
                                                ))}
                                        </div>
                                        <textarea
                                            type="text"
                                            placeholder="Write a review to let the author and other cooks know how this recipe turned out..."
                                            value={review}
                                            maxLength={"500"}
                                            minLength={"3"}
                                            onChange={(e) =>
                                                setReview(e.target.value)
                                            }
                                        ></textarea>
                                        <div className="add-review-actions">
                                            <button
                                                type="reset"
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                            <div>
                                <AllReviews recipe_id={recipeId} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeDetailPage;
