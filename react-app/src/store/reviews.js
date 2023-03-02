// constants
const GET_RECIPE_REVIEWS = "reviews/GET_RECIPE_REVIEWS"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"

// action creators
const getRecipeReviewsAct = (reviews) => {
    return {
        type: GET_RECIPE_REVIEWS,
        reviews
    }
}

const createReviewAct = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

// thunks
export const getRecipeReviewsThunk = (recipe_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${recipe_id}`)

    if (response.ok) {
        const data = await response.json();
        const reviewsArr = data.reviews;
        dispatch(getRecipeReviewsAct(reviewsArr));
        return data
    }
}

export const createReviewThunk = (reviewInfo) => async (dispatch) => {
    const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewInfo)
    })

    if (response.ok) {
        const newReview = await response.json()
        dispatch(createReviewAct(newReview))
        return newReview
    }
}


// store

const initialState = { recipe: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RECIPE_REVIEWS:
            newState = {...state}
            const normalizedReviews = {}
            action.reviews.forEach((review) => normalizedReviews[review.id] = review)
            newState.recipe = normalizedReviews
            console.log("normalizedReviews", normalizedReviews)
            newState.user = {}
            return newState

        case CREATE_REVIEW:
            newState = {...state}
            newState.user = {...state.user}
            newState.recipe = {...state.recipe, [action.review.id]:action.review}
            return newState

        default:
            return state
    }
}

export default reviewsReducer
