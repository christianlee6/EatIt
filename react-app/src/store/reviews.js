// constants
const GET_RECIPE_REVIEWS = "reviews/GET_RECIPE_REVIEWS"
const GET_SINGLE_REVIEW = "reviews/GET_SINGLE_REVIEW"
const CREATE_REVIEW = "reviews/CREATE_REVIEW"
const EDIT_REVIEW = "reviews/EDIT_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"


// action creators
const getRecipeReviewsAct = (reviews) => {
    return {
        type: GET_RECIPE_REVIEWS,
        reviews
    }
}

const getSingleReviewAct = (review) => {
    return {
        type: GET_SINGLE_REVIEW,
        review
    }
}

const createReviewAct = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const editReviewAct = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const deleteReviewAct = (review) => {
    return {
        type: DELETE_REVIEW,
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
    console.log("reviewInfo in thunk", reviewInfo)
    const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewInfo)
    })

    if (response.ok) {
        const newReview = await response.json()
        console.log("newReview in thunk", newReview)
        dispatch(createReviewAct(newReview))
        return newReview
    }
}

export const editReviewThunk = (reviewInfo, review_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewInfo)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(editReviewAct(review))
        return review
    }
}

export const getSingleReviewThunk = (review_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}`)

    if (response.ok) {
        const review = await response.json();
        dispatch(getSingleReviewAct(review))
    }
}

export const deleteReviewThunk = (review_id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(deleteReviewAct(review))
    }
}

// store

const initialState = { recipe: {}, user: {}, singleReview: {} };

const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RECIPE_REVIEWS:
            newState = {...state}
            const normalizedReviews = {}
            action.reviews.forEach((review) => normalizedReviews[review.id] = review)
            newState.recipe = normalizedReviews
            // console.log("normalizedReviews", normalizedReviews)
            newState.user = {}
            return newState

        case GET_SINGLE_REVIEW:
            newState = { recipe: {}, user: {}, singleReview: {} }
            newState.singleReview = action.review
            return newState

        case CREATE_REVIEW:
            newState = {...state}
            newState.user = {...state.user}
            newState.recipe = {...state.recipe, [action.review.id]:action.review}
            return newState

        case EDIT_REVIEW:
            newState = {...state}
            const updatedReview = {...newState.recipe[action.review.id], ...action.review}
            newState.singleReview = {...state.singleReview, ...updatedReview}
            newState.recipe = {...state.recipe, [action.review.id]:updatedReview}
            return newState

        case DELETE_REVIEW:
            newState = {...state}
            delete newState.recipe[action.review.id]
            return newState

        default:
            return state
    }
}

export default reviewsReducer
