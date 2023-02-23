import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div className="logged-in-nav-buttons-container">
                <div className="profile-button">
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div className="logged-out-nav-buttons-container">
                <div className="login-button">
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </div>
                <div className="signup-button">
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="nav-buttons-container">
                <div className="left-tab-container">
                    <div className="home-button-container">
                        <NavLink exact to="/" className={"home-button-container"}>
                            <div className="label-logo-container">
                                <div className="eatit-logo">logo</div>
                                <div className="eatit-label">EatIt</div>
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="right-tabs-container">
                    {/* {isLoaded && sessionLinks} */}
                    <div className="signup-container">
                        <div className="signup-button-container">
                            <OpenModalButton
                                className="test"
                                buttonText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </div>
                    </div>
                    <div className="login-container">
                        <div className="login-button-container">
                            <OpenModalButton
                                className="test"
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;
