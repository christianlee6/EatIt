import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipeThunk } from "../../store/recipes";

const CreateRecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
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
        if (user) setErrors([]);
        else setErrors(["Please create an account or log in to share your recipe."])
    }, [user])

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


        const data = await dispatch(createRecipeThunk(recipeInfo));
        console.log("data", data)
        if (data.errors) {
          setErrors(data.errors);
        } else {
            history.push(`/recipes/${data.id}`)
            console.log("errors", errors)
        }
      };


    return (
        <>
            <div className="create-recipe-whole-container">
                <h2 className="create-recipe-header">Share Your Recipe Now</h2>
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
                            <textarea
                                type={"text"}
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
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
                            <textarea
                                type={"text"}
                                required
                                value={instructions}
                                onChange={(e) =>
                                    setInstructions(e.target.value)
                                }
                            ></textarea>
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

export default CreateRecipeForm;
