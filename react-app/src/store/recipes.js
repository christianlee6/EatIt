// constants
const GET_ALL_RECIPES = "recipes/GET_ALL_RECIPES"

// action creators
const getAllRecipesAct = (recipes) => {
    return {
        type: GET_ALL_RECIPES,
        recipes
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

// store
const initialState = { allRecipes: {}, singleRecipe: {} };

const recipesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_RECIPES:
            newState = { allRecipes: {}, singleSpot: {} }
            const normalizedRecipes = {}
            action.recipes.recipes.forEach((recipe) => normalizedRecipes[recipe.id] = recipe)
            newState.allRecipes = normalizedRecipes
            return newState


        default:
            return state

    }
}

export default recipesReducer
