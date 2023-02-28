// constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES"
const GET_SINGLE_RECIPE = "recipes/GET_SINGLE_RECIPE"
const CREATE_RECIPE = "recipes/CREATE_RECIPE"
const EDIT_RECIPE = "recipes/EDIT_RECIPE"
const DELETE_RECIPE = "recipes/DELETE_RECIPE"

// action creators
const getAllRecipesAct = (recipes) => {
    return {
        type: GET_ALL_RECIPES,
        recipes
    }
}

const getSingleRecipeAct = (recipe) => {
    return {
        type: GET_SINGLE_RECIPE,
        recipe
    }
}

const createRecipeAct = (recipe) => {
    return {
        type: CREATE_RECIPE,
        recipe
    }
}

const editRecipeAct = (recipe) => {
    return {
        type: EDIT_RECIPE,
        recipe
    }
}

const deleteRecipeAct = (recipe) => {
    return {
        type: DELETE_RECIPE,
        recipe
    }
}


// thunks
export const getAllRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes/")

    if (response.ok) {
        const recipes = await response.json();
        dispatch(getAllRecipesAct(recipes))
        return recipes
    }
};

export const getSingleRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`);

    if (response.ok) {
        const recipe = await response.json();
        dispatch(getSingleRecipeAct(recipe));
        return recipe;
    }
}

export const createRecipeThunk = (recipeInfo) => async (dispatch) => {
    const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeInfo)
    })

    if (response.ok) {
        const newRecipe = await response.json();
        dispatch(createRecipeAct(newRecipe))
        return newRecipe
    }
}

export const editRecipeThunk = (recipeInfo, recipe_id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeInfo)
    })

    if (response.ok) {
        const recipe = await response.json();
        dispatch(editRecipeAct(recipe))
        return recipe
    }
}

export const deleteRecipeThunk = (recipe_id) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const recipe = await response.json();
        dispatch(deleteRecipeAct(recipe))
        return recipe
    }
}

// store
const initialState = { allRecipes: {}, singleRecipe: {} };

const recipesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_RECIPES:
            newState = { allRecipes: {}, singleRecipe: {} }
            const normalizedRecipes = {}
            action.recipes.recipes.forEach((recipe) => normalizedRecipes[recipe.id] = recipe)
            newState.allRecipes = normalizedRecipes
            return newState

        case GET_SINGLE_RECIPE:
            newState = { allRecipes: {}, singleRecipe: {} }
            newState.singleRecipe = action.recipe
            return newState

        case CREATE_RECIPE:
            newState = {...state}
            newState.allRecipes = {...state.allRecipes, [action.recipe.id]:action.recipe}
            return newState

        case EDIT_RECIPE:
            newState = {...state}
            const editedRecipe = {...newState.allRecipes[action.recipe.id], ...action.recipe}
            newState.singleRecipe = {...state.singleRecipe, ...editedRecipe}
            newState.allRecipes = {...state.allRecipes, [action.recipe.id]:editedRecipe}
            return newState

        case DELETE_RECIPE:
            newState = {...state}
            delete newState.allRecipes[action.recipe]
            return newState


        default:
            return state

    }
}

export default recipesReducer
