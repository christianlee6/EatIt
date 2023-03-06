import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk, getRecipeReviewsThunk } from "../../store/reviews";
import { editReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";



const EditReviewForm = ({ review }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const { closeModal } = useModal();
    // console.log("recipeId", reviewId)

    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.recipe);

    const [reviewer_id, setreviewer_id] = useState(null);
    const [recipe_id, setrecipe_id] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [hoverFill, setHoverFill] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (review) {
            setreviewer_id(review.reviewer_id);
            setrecipe_id(review.recipe_id);
            setReviewText(review.review);
            setRating(review.rating);
            setCreatedAt(review.created_at);
            setUpdatedAt(review.updated_at);
        }
    }, [review]);

    const handleClear = async (e) => {
        e.preventDefault();
        setRating(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = [];
        setHasSubmitted(true);

        const reviewInfo = {
            ...review,
            reviewer_id,
            recipe_id,
            review: reviewText,
            rating,
            created_at: createdAt,
            updated_at: new Date(),
        };

        if (!rating) {
            errorsArr.push("Please include a star rating with your review.");
        }
        if (!review) {
            errorsArr.push("Please include text with your review.");
        }
        if (review.length > 250) {
            errorsArr.push("Review must be less than 250 characters long");
        }

        setErrors(errorsArr);

        if (errorsArr.length === 0) {
            dispatch(editReviewThunk(reviewInfo, review.id)).then(closeModal())
        }
        // const data = dispatch(editReviewThunk(reviewInfo, review.id)).then(
        //     () => {
        //         dispatch(getRecipeReviewsThunk(review.recipe_id)).then(closeModal());
        //     }
        // );
        // if (data.errors) {
        //     setErrors(data.errors);
        // }
    };

    const handleCancel = async (e) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-header">Edit Your Review</div>
                    <div className="line-break"></div>
                    <div className="validation-errors">
                    {hasSubmitted &&
                        errors?.map((error) => <div key={error}>{error}</div>)}
                </div>
                    <textarea
                        type="text"
                        value={reviewText}
                        maxLength={"500"}
                        minLength={"3"}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
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
                                            type="button"
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
                    <div className="add-review-actions">
                        <button class="review-buttons" type="reset" onClick={handleCancel}>Cancel</button>
                        <button class="review-buttons" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditReviewForm;
