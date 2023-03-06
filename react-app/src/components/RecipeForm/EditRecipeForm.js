import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editRecipeThunk } from "../../store/recipes";

const EditRecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    console.log("recipe:", recipe);
    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [prep_time, setprep_time] = useState("");
    const [preview_img, setpreview_img] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [servings, setServings] = useState(null);
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // ----------------------------------------------------------------
    const existingIngredients = recipe.ingredients?.split(".");
    const defaultIngredientState = [];

    for (let i = 0; i < existingIngredients?.length - 1; i++) {
        let ingredient = existingIngredients[i];
        defaultIngredientState.push(ingredient)
    }

    const [val, setVal] = useState(defaultIngredientState);

    const handleAdd = () => {
        const text = [...val, []];
        setVal(text);
    };

    const handleChange = (onChangeValue, idx) => {
        const inputData = [...val];
        inputData[idx] = onChangeValue.target.value;
        setVal(inputData);
    };

    const handleDelete = (idx) => {
        const deleteVal = [...val];
        deleteVal.splice(idx, 1);
        setVal(deleteVal);
    };

    // ----------------------------------------------------------------
    const existingInstructions = recipe.instructions?.split("Step ")
    const stepsArr = existingInstructions?.filter(
        (instruction) => instruction.length > 1
    );

    const parsedSteps = [];
    for (let i = 0; i < stepsArr?.length; i++) {
        let step = stepsArr[i].substring(3);
        parsedSteps.push(step);
    }

    const [instructionsVal, setInstructionsVal] = useState(parsedSteps)
    // console.log('instructionVal', instructionsVal)

    // console.log('parsedInstructions', parsedInstructions)
    const handleInstructionAdd = () => {
        const text = [...instructionsVal, []];
        setInstructionsVal(text);
    };

    const handleInstructionChange = (onChangeValue, idx) => {
        const inputData = [...instructionsVal];
        inputData[idx] = onChangeValue.target.value;
        setInstructionsVal(inputData);
    };

    const handleInstructionDelete = (idx) => {
        const deleteVal = [...instructionsVal];
        deleteVal.splice(idx, 1);
        setInstructionsVal(deleteVal);
    };

    useEffect(() => {}, [dispatch, recipeId]);

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setDescription(recipe.description);
            setCuisine(recipe.cuisine);
            setDifficulty(recipe.difficulty);
            setprep_time(recipe.prep_time);
            setpreview_img(recipe.preview_img);
            setInstructions(recipe.instructions);
            setIngredients(recipe.ingredients);
            setServings(recipe.servings);
            setCreatedAt(recipe.created_at);
            setUpdatedAt(recipe.updated_at);
        }
    }, [recipe]);

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

        const trimmedArr = [];
        for (let i = 0; i < val?.length; i++) {
            let ele = val[i];
            if (typeof ele === "string") {
                let trimmedEle = ele?.trim() + ".";
                trimmedArr?.push(trimmedEle);
            }
        }
        const parsedVal = trimmedArr?.join(" ");
        setIngredients(parsedVal);

        const parsedInstructions = []
        for (let i = 0; i < instructionsVal.length; i++) {
            let instruction = instructionsVal[i]
            let ele = `Step ${i + 1}: ${instruction}.`
            parsedInstructions.push(ele)
        }
        console.log('parsedInstructions', parsedInstructions)
        const instructionsStr = parsedInstructions.join(" ")
        console.log('instructionsStr', instructionsStr)
        setInstructions(instructionsStr)

        const recipeInfo = {
            ...recipe,
            name,
            creator_id: user.id,
            description,
            cuisine,
            difficulty,
            prep_time,
            preview_img,
            instructions: instructionsStr,
            ingredients: parsedVal,
            created_at: createdAt,
            updated_at: new Date(),
        };
        console.log('recipeInfo', recipeInfo)

        const data = await dispatch(editRecipeThunk(recipeInfo, +recipeId));
        console.log("data", data);
        // console.log("data.errors", data.errors)
        if (data.errors) {
            // console.log("errorsArr", errorsArr)
            //   setErrors(errorsArr);
            //   console.log("errors", errors)
            console.log("ln 90");
        } else {
            history.push(`/recipes/${data.id}`);
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
                        <div className="recipe-name-description-container">
                            <label>
                                Recipe Name:
                                <input
                                    type={"text"}
                                    value={name}
                                    placeholder="Give your recipe a name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label>
                                Description:
                                <textarea
                                    type={"text"}
                                    value={description}
                                    placeholder="Share the story behind your recipe and what makes it so special"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </label>
                            <label>
                                Cuisine:
                                <input
                                    type={"text"}
                                    value={cuisine}
                                    placeholder="e.g. Italian"
                                    onChange={(e) => setCuisine(e.target.value)}
                                />
                            </label>
                            <label>
                                Preview Image URL:
                                <input
                                    type={"text"}
                                    value={preview_img}
                                    placeholder="Provide an image URL"
                                    onChange={(e) =>
                                        setpreview_img(e.target.value)
                                    }
                                />
                            </label>
                        </div>

                        <div className="ingredients-container">
                            <legend>Ingredients </legend>
                            <p>
                                Modify any of the ingredients of your recipe.
                                You can make edits to the quantities, preparation
                                methods, or needed ingredients of your recipe.
                            </p>
                            <>
                                {val?.map((data, idx) => {
                                    return (
                                        <div>
                                            <input
                                                value={data || ""}
                                                onChange={(e) =>
                                                    handleChange(e, idx)
                                                }
                                                placeholder="e.g. 2 tablespoons butter, softened..."
                                            />
                                            <button type="button"
                                                onClick={(e) =>
                                                    handleDelete(idx)
                                                }
                                            >
                                                x
                                            </button>
                                        </div>
                                    );
                                })}
                                <button
                                    type="button"
                                    onClick={() => handleAdd()}
                                >
                                    ADD INGREDIENT
                                </button>
                            </>
                        </div>

                        <div className="instructions-container">
                            <legend>Instructions </legend>
                            <p>
                                Modify any of the instructions of your recipe. Make edits to existing instructions, or add or remove steps.
                            </p>
                            <>
                                {instructionsVal?.map(
                                    (instructionData, idx) => {
                                        return (
                                            <div>
                                                <div>Step {idx + 1}</div>
                                                <input
                                                    value={
                                                        instructionData || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleInstructionChange(
                                                            e,
                                                            idx
                                                        )
                                                    }
                                                    placeholder="e.g. Preheat oven to 350 degrees F..."
                                                />
                                                <button type="button"
                                                    onClick={(e) =>
                                                        handleInstructionDelete(
                                                            idx
                                                        )
                                                    }
                                                >
                                                    x
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                                <button
                                    type="button"
                                    onClick={() => handleInstructionAdd()}
                                >
                                    ADD STEP
                                </button>
                            </>
                        </div>

                        <label>
                            Servings:
                            <input
                                type={"number"}
                                value={servings}
                                placeholder="e.g. 6"
                                onChange={(e) => setServings(e.target.value)}
                            />
                        </label>

                        <label>
                            Prep Time:
                            <input
                                type={"number"}
                                value={prep_time}
                                placeholder="(minutes)"
                                onChange={(e) => setprep_time(e.target.value)}
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
