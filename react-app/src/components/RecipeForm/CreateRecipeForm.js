import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipeThunk } from "../../store/recipes";
import "./CreateRecipeForm.css";

const CreateRecipeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const errorsArr = [];
    const user = useSelector((state) => state.session.user);

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

    const [errors, setErrors] = useState([]);
    // console.log('errors', errors)
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // console.log('newInstructions', newInstructions)
    // console.log('newIngredients', newIngredients)
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
    };

    // ----------------------------------------------------------------

    const [instructionsVal, setInstructionsVal] = useState([""]);
    // console.log('instructionsVal', instructionsVal)

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

    const handleCancel = () => {
        history.push("/");
    };

    const trimmedArr = [];
    for (let i = 0; i < val?.length; i++) {
        let ele = val[i];
        if (typeof ele === "string") {
            let trimmedEle = ele?.trim() + ".";
            trimmedArr?.push(trimmedEle);
        }
    }
    // console.log('trimmedArr', trimmedArr)
    const parsedVal = trimmedArr?.join(" ");
    console.log("parsedVal", parsedVal);
    if (!parsedVal || parsedVal === ".")
        errorsArr.push("Please enter at least one ingredient");

    const parsedInstructions = [];
    for (let i = 0; i < instructionsVal.length; i++) {
        let instruction = instructionsVal[i];
        if (instruction.length !== 0) {
            let ele = `Step ${i + 1}: ${instruction}.`;
            parsedInstructions.push(ele);
        }
    }
    const instructionsStr = parsedInstructions.join(" ");
    console.log("instructionsStr", instructionsStr);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = [];
        setHasSubmitted(true);
        setNewIngredients(parsedVal);
        console.log("newIngredients", newIngredients);
        setNewInstructions(instructionsStr);
        console.log("newInstructions", newInstructions);

        if (!name) errorsArr.push("Please enter a name for your recipe.");
        if (name.length > 100)
            errorsArr.push("Recipe name must be less than 100 characters long.");
        if (!description)
            errorsArr.push("Please enter a description for your recipe.");
        if (description.length > 2500)
            errorsArr.push(
                "Description must be less than 2500 characters long."
            );
        if (!cuisine) errorsArr.push("Please enter a cuisine.");
        if (cuisine.length > 50)
            errorsArr.push("Cuisine must be less than 50 characters long.");
        if (!prep_time) errorsArr.push("Please enter a prep time.");
        if (prep_time > 1000)
            errorsArr.push("Prep Time must be less than 1000 minutes.");
        if (!preview_img) errorsArr.push("Please enter an image URL.");
        if (!parsedVal || parsedVal === "") {
            errorsArr.push("Please provide at least one ingredient.");
        }
        if (!instructionsStr)
            errorsArr.push("Please provide at least one step.");
        if (!servings)
            errorsArr.push(
                "Please include the number of servings this recipe makes."
            );
        if (servings > 20) errorsArr.push("Servings cannot be more than 20.");

        setErrors(errorsArr);
        console.log("errorsArr", errorsArr);
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
        console.log("recipeInfo", recipeInfo);

        console.log("errors", errors);
        if (errorsArr.length === 0) {
            console.log("there are no errors");
            console.log("DISPATCH CREATE THUNK");
            const data = await dispatch(createRecipeThunk(recipeInfo));
            console.log("data", data);
            history.push(`/recipes/${data.id}`);
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-header">Create A Recipe</div>
                    <div className="line-break"></div>
                    {/* <div className="login-subheader">
                    Please fill out the form to share your recipe.
                    </div> */}
                    <div className="validation-errors">
                        {hasSubmitted &&
                            errors?.map((error) => (
                                <li key={error}>{error}</li>
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
                            <br></br>
                            <textarea
                                cols="68"
                                rows="3"
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
                            Enter one ingredient per line. Include the quantity
                            (i.e. cups, tablespoons) and preparation method
                            (i.e. sifted, softened, chopped).
                        </p>
                        <>
                            {val?.map((data, idx) => {
                                return (
                                    <div className="single-ingredient">
                                        <input
                                            cols="35"
                                            rows="2"
                                            value={data || ""}
                                            onChange={(e) =>
                                                handleChange(e, idx)
                                            }
                                            placeholder="e.g. 2 tablespoons butter, softened..."

                                        />
                                        <button
                                            className="delete-ingredient-instruction-button"
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
                            Explain how to make your recipe, including all relevant details such as oven
                            temperatures, cooking methods, and directions.
                        </p>
                        <>
                            {instructionsVal?.map((instructionData, idx) => {
                                return (
                                    <div className="single-instruction">
                                        <div>Step {idx + 1}</div>
                                        <div className="instruction-input-and-delete">
                                            <textarea
                                                cols="68"
                                                rows="2"
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

                        <label className="input-field">
                            Servings:
                            <input
                                type={"number"}
                                value={servings}
                                placeholder="e.g. 6"
                                onChange={(e) => setServings(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label className="input-field">
                            Prep Time:
                            <input
                                type={"number"}
                                value={prep_time}
                                placeholder="(minutes)"
                                onChange={(e) => setprep_time(e.target.value)}
                            />
                        </label>
                        <div className="form-input-break"></div>

                        <label className="difficulty-input-field">
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
                    <button className="submit" type="submit">
                        Submit
                    </button>
                    <button className="submit" onClick={handleCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateRecipeForm;
