import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeReviewsThunk } from "../../store/reviews";
import SingleReview from "./SingleReview";

const AllReviews = ({ recipe_id }) => {
    const dispatch = useDispatch();

    const reviews = useSelector((state) => state.reviews.recipe);
    const reviewsArr = Object.values(reviews);

    useEffect(() => {
        dispatch(getRecipeReviewsThunk(recipe_id))
    }, [dispatch, reviewsArr.length])

    if (!reviews) {
        return null;
    }

    return (
        <div className="all-reviews-container">

                    {reviewsArr.map((review) => (
                        <SingleReview review={review} />
                    ))}

        </div>
    );
};

export default AllReviews;
