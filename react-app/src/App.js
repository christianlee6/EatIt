import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage/HomePage";
import RecipeDetailPage from "./components/Recipes/RecipeDetailPage";
import CreateRecipeForm from "./components/RecipeForm/CreateRecipeForm";
import EditRecipeForm from "./components/RecipeForm/EditRecipeForm";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route exact path="/recipes/new">
                        <CreateRecipeForm />
                    </Route>
                    <Route exact path="/recipes/edit/:recipeId">
                        <EditRecipeForm />
                    </Route>
                    <Route exact path="/recipes/:recipeId">
                        <RecipeDetailPage isLoaded={isLoaded} />
                    </Route>
                    <Route path="/login">
                        <LoginFormPage />
                    </Route>
                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>
                </Switch>
            )}
        </>
    );
}

export default App;
