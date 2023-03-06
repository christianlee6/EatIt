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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewInfo = {
            ...review,
            reviewer_id,
            recipe_id,
            review: reviewText,
            rating,
            created_at: createdAt,
            updated_at: new Date(),
        };

        const data = dispatch(editReviewThunk(reviewInfo, review.id)).then(
            () => {
                dispatch(getRecipeReviewsThunk(review.recipe_id)).then(closeModal());
            }
        );
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
            <div className="recipe-detail-page-add-review-container">
                <form onSubmit={handleSubmit}>
                    <div>Edit Your Review</div>
                    <textarea
                        type="text"
                        value={reviewText}
                        maxLength={"500"}
                        minLength={"3"}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    <div className="add-review-actions">
                        <button type="reset" onClick={handleCancel}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditReviewForm;
