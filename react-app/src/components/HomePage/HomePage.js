import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllRecipesThunk } from "../../store/recipes"
import RecipeDetailCard from "../Recipes/RecipeDetailCard"
import "./HomePage.css"

function HomePage() {
    const dispatch = useDispatch()
    const recipesObj = useSelector(state => state.recipes.allRecipes)
    const recipesArr = Object.values(recipesObj)

    useEffect(() => {
        dispatch(getAllRecipesThunk())
    }, [dispatch])

    console.log("recipesObj", recipesObj)
    console.log("recipesArr", recipesArr)

    return (
        <>
            <div className="all-recipes-wrapper">
                <div className="all-recipes-container">
                    {recipesArr.map((recipe) => (
                        <RecipeDetailCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage
