import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";

const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    console.log("recipeId", recipeId)

    const user = useSelector((state) => state.session.user);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // const handleCancel = async (e) => {
    //     e.preventDefault()
    //     setReview("")
    //     setErrors([])
    // }

    // const reset = () => {
    //     setReview("");
    //     setRating("");
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewInfo = {
            reviewer_id: user.id,
            recipe_id: +recipeId,
            review,
            rating: 5,
            created_at: new Date(),
        };

        console.log("reviewInfo", reviewInfo)

        const data = await dispatch(createReviewThunk(reviewInfo));
        console.log("data", data)
        if (data.errors) {
            setErrors(data.errors);
        }
    };

    return (
        <>
            <div className="recipe-detail-page-add-review-container">
                <form onSubmit={handleSubmit}>
                    <div>Add Review</div>
                    <textarea
                        type="text"
                        placeholder="Write a review to let the author and other cooks know how this recipe turned out..."
                        value={review}
                        maxLength={"500"}
                        minLength={"3"}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                    <div className="add-review-actions">
                        <button type="reset">Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateReviewForm
