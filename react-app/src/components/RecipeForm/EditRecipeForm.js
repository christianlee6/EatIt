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
    const errorsArr = [];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [difficulty, setDifficulty] = useState(1);
    const [prep_time, setprep_time] = useState("");
    const [preview_img, setpreview_img] = useState("");
    const [newInstructions, setNewInstructions] = useState("");
    const [newIngredients, setNewIngredients] = useState("");
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
        defaultIngredientState.push(ingredient);
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
    const existingInstructions = recipe.instructions?.split("Step ");
    console.log("existingInstructions", existingInstructions);

    const stepsArr = existingInstructions?.filter(
        (instruction) => instruction.length > 1
    );
    console.log("stepsArr", stepsArr);

    const parsedSteps = [];
    for (let i = 0; i < stepsArr?.length; i++) {
        let step = stepsArr[i].substring(3);
        parsedSteps.push(step);
    }

    const [instructionsVal, setInstructionsVal] = useState(parsedSteps);
    console.log("instructionVal", instructionsVal);

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

    // ----------------------------------------------------------------

    useEffect(() => {}, [dispatch, recipeId]);

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setDescription(recipe.description);
            setCuisine(recipe.cuisine);
            setDifficulty(recipe.difficulty);
            setprep_time(recipe.prep_time);
            setpreview_img(recipe.preview_img);
            setNewInstructions(recipe.instructions);
            setNewIngredients(recipe.ingredients);
            setServings(recipe.servings);
            setCreatedAt(recipe.created_at);
            setUpdatedAt(recipe.updated_at);
        }
    }, [recipe]);

    const handleCancel = () => {
        history.push(`/recipes/${recipe.id}`);
    };

    const trimmedArr = [];
    for (let i = 0; i < val?.length; i++) {
        let ele = val[i];
        if (typeof ele === "string") {
            let trimmedEle = ele?.trim() + ".";
            trimmedArr?.push(trimmedEle);
        }
    }
    console.log("trimmedArr", trimmedArr);
    const parsedVal = trimmedArr?.join(" ");
    console.log("parsedVal", parsedVal);
    if (!parsedVal) errorsArr.push("Please enter at least one ingredient");

    const parsedInstructions = [];
    for (let i = 0; i < instructionsVal.length; i++) {
        let instruction = instructionsVal[i];
        console.log("instruction", instruction);
        if (instruction.length !== 0) {
            let ele = `Step ${i + 1}: ${instruction}`;
            parsedInstructions.push(ele);
        }
    }
    console.log("parsedInstructions", parsedInstructions);

    const instructionsStr = parsedInstructions.join(" ");
    console.log("instructionsStr", instructionsStr);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = [];
        setHasSubmitted(true);

        setNewIngredients(parsedVal);

        setNewInstructions(instructionsStr);

        if (!name) errorsArr.push("Please enter a name for your recipe");
        if (name.length > 100)
            errorsArr.push("Recipe name must be less than 100 characters long");
        if (!description)
            errorsArr.push("Please enter a description for your recipe");
        if (description.length > 2500)
            errorsArr.push(
                "Description must be less than 2500 characters long"
            );
        if (!cuisine) errorsArr.push("Please enter a cuisine");
        if (cuisine.length > 50)
            errorsArr.push("Cuisine must be less than 50 characters long");
        if (!prep_time) errorsArr.push("Please enter a prep time");
        if (prep_time > 1000)
            errorsArr.push("Prep Time must be less than 1000 minutes");
        if (!preview_img) errorsArr.push("Please enter an image URL");
        if (!parsedVal || parsedVal === "") {
            errorsArr.push("Please provide at least one ingredient");
        }
        if (!instructionsStr)
            errorsArr.push("Please provide at least one step");
        if (!servings)
            errorsArr.push(
                "Please include the number of servings this recipe makes"
            );
        if (servings > 20) errorsArr.push("Servings cannot be more than 20");

        setErrors(errorsArr);
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
        console.log("recipeInfo", recipeInfo);
        console.log("errors", errors);

        if (errorsArr.length === 0) {
            console.log("there are no errors");
            console.log("DISPATCH CREATE THUNK");
            const data = await dispatch(editRecipeThunk(recipeInfo, +recipeId));
            console.log("data", data);
            history.push(`/recipes/${data.id}`);
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-header">Edit Your Recipe</div>
                    <div className="line-break"></div>
                    <div className="validation-errors">
                        {hasSubmitted &&
                            errors?.map((error) => (
                                <div key={error}>{error}</div>
                            ))}
                    </div>
                    <div className="form-input-wrapper">
                        <label className="input-field">
                            Recipe Name:
                            <input
                                type={"text"}
                                value={name}
                                placeholder="Give your recipe a name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label className="input-field">
                            Description:
                            <textarea
                                type={"text"}
                                value={description}
                                placeholder="Share the story behind your recipe and what makes it so special"
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </label>
                        <div className="form-input-break"></div>

                        <label className="input-field">
                            Cuisine:
                            <input
                                type={"text"}
                                value={cuisine}
                                placeholder="e.g. Italian"
                                onChange={(e) => setCuisine(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label className="input-field">
                            Preview Image URL:
                            <input
                                type={"text"}
                                value={preview_img}
                                placeholder="Provide an image URL"
                                onChange={(e) => setpreview_img(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>
                        <label className="input-field">Ingredients </label>
                        <p>
                            Modify any of the ingredients of your recipe. You
                            can make edits to the quantities, preparation
                            methods, or required ingredients of your recipe.
                        </p>
                        <>
                            {val?.map((data, idx) => {
                                return (
                                    <div className="single-ingredient">
                                        <input
                                            value={data || ""}
                                            onChange={(e) =>
                                                handleChange(e, idx)
                                            }
                                            placeholder="e.g. 2 tablespoons butter, softened..."
                                        />
                                        <button
                                            className="delete-ingredient-instruction-button"
                                            type="button"
                                            onClick={(e) => handleDelete(idx)}
                                        >
                                            x
                                        </button>
                                    </div>
                                );
                            })}
                            <button className="add" type="button" onClick={() => handleAdd()}>
                                ADD INGREDIENT
                            </button>
                        </>
                        <div className="form-input-break"></div>
                        <label className="input-field">Instructions </label>
                        <p>
                            Modify any of the instructions of your recipe. Make
                            edits to existing instructions, or add or remove
                            steps.
                        </p>
                        <>
                            {instructionsVal?.map((instructionData, idx) => {
                                return (
                                    <div className="single-instruction">
                                        <div>Step {idx + 1}</div>
                                        <div className="instruction-input-and-delete">
                                            <textarea
                                                value={instructionData || ""}
                                                onChange={(e) =>
                                                    handleInstructionChange(
                                                        e,
                                                        idx
                                                    )
                                                }
                                                placeholder="e.g. Preheat oven to 350 degrees F..."
                                            />
                                            <button
                                            className="delete-ingredient-instruction-button"
                                                type="button"
                                                onClick={(e) =>
                                                    handleInstructionDelete(idx)
                                                }
                                            >
                                                x
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            <button
                            className="add"
                                type="button"
                                onClick={() => handleInstructionAdd()}
                            >
                                ADD STEP
                            </button>
                        </>
                        <div className="form-input-break"></div>
                        <label>
                            Servings:
                            <input
                                type={"number"}
                                value={servings}
                                placeholder="e.g. 6"
                                onChange={(e) => setServings(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label>
                            Prep Time:
                            <input
                                type={"number"}
                                value={prep_time}
                                placeholder="(minutes)"
                                onChange={(e) => setprep_time(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label>
                            Difficulty Rating:{" "}
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
                    </div>
                    <button
                        className="submit"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="submit"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditRecipeForm;
