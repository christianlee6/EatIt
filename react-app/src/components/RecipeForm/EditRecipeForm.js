import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editRecipeThunk } from "../../store/recipes";


const EditRecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state.recipes.singleRecipe)
    console.log(recipe)
    const user = useSelector(state => state.session.user)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [prep_time, setprep_time] = useState("");
    const [preview_img, setpreview_img] = useState("");
    const [instructions, setInstructions] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(editRecipeThunk(+recipeId))
    }, [dispatch, recipeId])

    useEffect(() => {
        if (user) {
            if (user.id === recipe.creator_id) setErrors([])
            else setErrors(["Only the creator of this recipe can make edits."])
        } else setErrors(["You must be logged in to edit a recipe."])
    }, [user, recipe])

    useEffect(() => {
        if (recipe) {
            setName(recipe.name)
            setDescription(recipe.description)
            setCuisine(recipe.cuisine)
            setprep_time(recipe.prep_time)
            setpreview_img(recipe.preview_img)
            setInstructions(recipe.instructions)
        }
    }, [recipe])

    const reset = () => {
        setName("");
        setDescription("");
        setCuisine("");
        setDifficulty(1);
        setprep_time();
        setpreview_img("");
        setInstructions("");
        setErrors([]);
        setHasSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       const recipeInfo = {
            name,
            creator_id: user.id,
            description,
            cuisine,
            difficulty,
            prep_time,
            preview_img,
            instructions,
            created_at: new Date()
        };


        const data = await dispatch(editRecipeThunk(recipeInfo, +recipeId));
        console.log("data", data)
        if (data) {
          setErrors(data);
          history.push(`/recipes/${data.id}`)
        } else {
            console.log("no errors")
        }
      };


    return (
        <>
            <div className="create-recipe-whole-container">
                <h2 className="create-recipe-header">Edit Your Recipe</h2>
                <div className="validation-errors">
                    {hasSubmitted &&
                        errors?.map((error) => <div key={error}>{error}</div>)}
                </div>
                <div className="create-recipe-form-container form-input-wrapper">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Recipe Name:
                            <input
                                type={"text"}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type={"text"}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Cuisine:
                            <input
                                type={"text"}
                                required
                                value={cuisine}
                                onChange={(e) => setCuisine(e.target.value)}
                            />
                        </label>
                        <label>
                            Difficulty Rating:
                            <select
                                type="number"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option>{num}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Prep Time:
                            <input
                                type={"number"}
                                required
                                value={prep_time}
                                onChange={(e) => setprep_time(e.target.value)}
                            />
                        </label>
                        <label>
                            Preview Image URL:
                            <input
                                type={"text"}
                                required
                                value={preview_img}
                                onChange={(e) => setpreview_img(e.target.value)}
                            />
                        </label>
                        <label>
                            Instructions:
                            <input
                                type={"text"}
                                required
                                value={instructions}
                                onChange={(e) =>
                                    setInstructions(e.target.value)
                                }
                            />
                        </label>

                        <button
                            className="create-recipe-submit-button"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button className="create-recipe-submit-button">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditRecipeForm;
