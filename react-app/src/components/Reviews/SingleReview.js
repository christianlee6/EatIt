import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditReviewForm from "../ReviewForm/EditReviewForm";
import { deleteReviewThunk } from "../../store/reviews";
import { getRecipeReviewsThunk } from "../../store/reviews";
import { useParams } from "react-router-dom";

const SingleReview = ({ review }) => {
    const dispatch = useDispatch();
    const { recipeId } = useParams();
    // console.log('review', review)

    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.recipe);
    const reviewsArr = Object.values(reviews);

    // useEffect(() => {
    //     (dispatch(getRecipeReviewsThunk(recipeId)))
    // }, [dispatch, reviewsArr.length])

    const removeCommentHandleCLick = async (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(review.id)).then(dispatch(getRecipeReviewsThunk(recipeId)))
    }

    let reviewButtons = null;
    if (user?.id === review.reviewer_id) {
        reviewButtons = (
            <div className="single-comment-buttons">
                <div className="edit-comment-button">
                    <OpenModalButton
                        buttonText="Edit"
                        modalComponent={<EditReviewForm review={review} />}
                    />
                </div>
                <button
                    className="delete-comment-button"
                    onClick={removeCommentHandleCLick}
                >
                    X
                </button>
            </div>
        );
    } else {
        reviewButtons = null
    }

    return (
        <div className="single-review-wrapper">
            <div className="single-review-reviewer-name">
                {review.user?.first_name} {review.user?.last_name}
                <div className="comment-buttons">{reviewButtons}</div>
            </div>
            <div className="single-review-content">{review.review}</div>
        </div>
    );
};

export default SingleReview;
