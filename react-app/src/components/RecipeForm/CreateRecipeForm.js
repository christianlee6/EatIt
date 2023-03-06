import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipeThunk } from "../../store/recipes";
import "./CreateRecipeForm.css";

const CreateRecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // ----------------------------------------------------------------
    const [val, setVal] = useState([""]);
    // console.log('val', val)

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
    }

    // ----------------------------------------------------------------

    const [instructionsVal, setInstructionsVal] = useState([""])

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

    const reset = () => {
        setName("");
        setDescription("");
        setCuisine("");
        setDifficulty(1);
        setprep_time();
        setpreview_img("");
        setInstructions("");
        setIngredients("");
        setServings(null);
        setErrors([]);
        setHasSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = []
        setHasSubmitted(true)

        const trimmedArr = [];
        for (let i = 0; i < val?.length; i++) {
            let ele = val[i];
            if (typeof ele === "string") {
                let trimmedEle = ele?.trim() + ".";
                trimmedArr?.push(trimmedEle);
            }
        }
        const parsedVal = trimmedArr?.join(" ");
        console.log("parsedVal", parsedVal)
        if (!parsedVal) errorsArr.push("Please enter at least one ingredient")
        setIngredients(parsedVal);
        console.log('ingredients', ingredients)

        const parsedInstructions = []
        for (let i = 0; i < instructionsVal.length; i++) {
            let instruction = instructionsVal[i]
            if (instruction.length !== 0) {
                let ele = `Step ${i + 1}: ${instruction}.`
                parsedInstructions.push(ele)
            }
        }
        const instructionsStr = parsedInstructions.join(" ")
        console.log('instructionsStr', instructionsStr)
        setInstructions(instructionsStr)


        if (!name) errorsArr.push("Please enter a name for your recipe")
        if (name.length > 100) errorsArr.push("Recipe name must be less than 100 characters long")
        if (!description) errorsArr.push("Please enter a description for your recipe")
        if (description.length > 2500) errorsArr.push("Description must be less than 2500 characters long")
        if (!cuisine) errorsArr.push("Please enter a cuisine")
        if (cuisine.length > 50) errorsArr.push("Cuisine must be less than 50 characters long")
        if (!prep_time) errorsArr.push("Please enter a prep time")
        if (prep_time > 1000) errorsArr.push("Prep Time must be less than 1000 minutes")
        if (!preview_img) errorsArr.push("Please enter an image URL")
        // if (ingredients === ".") errorsArr.push("Please enter at least one ingredient")
        if (!instructionsStr) errorsArr.push("Please provide at least one step")
        if (!servings) errorsArr.push("Please include the number of servings this recipe makes")
        if (servings > 20) errorsArr.push("Servings cannot be more than 20")


        // console.log('errorsArr', errorsArr)
        const recipeInfo = {
            name,
            creator_id: user.id,
            description,
            cuisine,
            difficulty,
            prep_time,
            preview_img,
            instructions: instructionsStr,
            ingredients: parsedVal,
            servings,
            created_at: new Date(),
        };
        console.log('recipeInfo', recipeInfo)
        setErrors(errorsArr)
        console.log('errors', errors)
        const data = await dispatch(createRecipeThunk(recipeInfo))
        console.log('data', data)

        if (data) {
            history.push(`/recipes/${data.id}`)
        }

        // if (!errors) {
        //     const data = dispatch(createRecipeThunk(recipeInfo))
        //     console.log('data', data)
        //     history.push(`/recipes/${data.id}`)
        // }
        // console.log("data", data);

        // history?.push(`/recipes/${data?.id}`)
        // if (data?.errors) {
        //     setErrors(data.errors);
        // } else {
        //     history?.push(`/recipes/${data.id}`);
        //     // console.log("errors", errors);
        // }
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
                    <form onSubmit={handleSubmit} >
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
                                Enter one ingredient per line. Include the
                                quantity (i.e. cups, tablespoons) and
                                preparation method (i.e. sifted, softened,
                                chopped).
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
                                            <button
                                                onClick={(e) =>
                                                    handleDelete(idx)
                                                }
                                            >
                                                x
                                            </button>
                                        </div>
                                    );
                                })}
                                <button type="button" onClick={() => handleAdd()}>
                                    ADD INGREDIENT
                                </button>
                            </>
                        </div>

                        <div className="instructions-container">
                            <legend>Instructions </legend>
                            <p>
                                Explain how to make your recipe, including oven temperatures, cooking methods, and directions.
                            </p>
                            <>
                                {instructionsVal?.map((instructionData, idx) => {
                                    return (
                                        <div>
                                            <div>
                                                Step {idx + 1}
                                            </div>
                                            <input
                                                value={instructionData || ""}
                                                onChange={(e) =>
                                                    handleInstructionChange(e, idx)
                                                }
                                                placeholder="e.g. Preheat oven to 350 degrees F..."
                                            />
                                            <button
                                                onClick={(e) =>
                                                    handleInstructionDelete(idx)
                                                }
                                            >
                                                x
                                            </button>
                                        </div>
                                    );
                                })}
                                <button type="button" onClick={() => handleInstructionAdd()}>
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

export default CreateRecipeForm;
