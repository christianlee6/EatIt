import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsArr = [];

        const dataErr = [];
        if (password === confirmPassword) {
            const data = await dispatch(
                signUp(first_name, last_name, email, password)
            );
            for (let i = 0; i < data?.length; i++) {
                let msg = data[i];
                let idxOf = msg.indexOf(":");
                let pushMsg = msg.slice(idxOf + 2, msg.length);
                dataErr.push(pushMsg);
            }

            if (data) {
                setErrors(dataErr);
            } else {
                closeModal();
            }
        } else {
            dataErr.push("Please check that your passwords match");
            setErrors(dataErr);
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="login-header">Sign Up</div>
                    <div className="line-break"></div>
                    <div className="login-subheader">
                        Create an account to start sharing your recipes!
                    </div>
                    <div className="validation-errors">
                        {errors.length > 0 &&
                            errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                    </div>
                    <div className="form-input-wrapper">
                        <label className="input-field">
                            First Name
                            <input
                                type="text"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>
                        <div className="form-input-break"></div>
                        <label className="input-field">
                            Last Name
                            <input
                                type="text"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                        <div className="form-input-break"></div>
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
                        <div className="form-input-break"></div>
                        <label className="input-field">
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </label>
                    </div>
                    <button className="submit" type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignupFormModal;
