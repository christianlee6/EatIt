import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        console.log("data", data);
        if (data) {
            setErrors(["Invalid credentials. Please try logging in again."]);
        } else {
            closeModal();
        }
    };

    const handleDemoSubmit = async (e) => {
        e.preventDefault();
        setEmail("demo@aa.io");
        setPassword("password");
        const data = await dispatch(login(email, password));
        console.log('data', data)
        // closeModal()
        if (data !== null) {
            setErrors(["Invalid credentials. Please try logging in again."]);
        } else {
            closeModal();
        }

    };

    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-header">Log In</div>
                    <div className="line-break"></div>
                    {/* <div className="login-subheader">
                        Welcome to EatIt!
                    </div> */}
                    <div className="validation-errors">
                        {errors.length > 0 && errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </div>
                    <div className="form-input-wrapper">
                        <label className="input-field">
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <div className="form-input-break"></div>
                        <label className="input-field">
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className="submit" type="submit">Log In</button>
                </form>
                    <button className="submit" type="button" onClick={handleDemoSubmit}>
                        Demo User
                    </button>
            </div>
        </>
    );
}

export default LoginFormModal;
