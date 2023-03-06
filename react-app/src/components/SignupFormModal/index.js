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
        let errorsArr = []

        const dataErr = []
		if (password === confirmPassword) {
			const data = await dispatch(signUp(first_name, last_name, email, password));
            for (let i = 0; i < data?.length; i++) {
                let msg = data[i]
                let idxOf = msg.indexOf(":")
                let pushMsg = msg.slice(idxOf + 2, msg.length)
                dataErr.push(pushMsg)
            }

			if (data) {
				setErrors(dataErr);
			} else {
				closeModal();
			}
		} else {
            dataErr.push("Please check that your passwords match")
			setErrors(dataErr)
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<div key={idx}>{error}</div>
					))}
				</ul>
                <label>
					First Name
					<input
						type="text"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
                <label>
					Last Name
					<input
						type="text"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
