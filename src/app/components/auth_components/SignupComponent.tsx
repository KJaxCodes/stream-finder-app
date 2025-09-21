"use client";

import React from 'react';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap form component for signup page
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';





type FormState = {
    email: string;
    password: string;
    emailError: string | null;
    passwordError: string | null;
    errors: string[] | null;
}

const SignupComponent: React.FC<{}> = () => {

    //local form state
    const [formState, setFormState] = React.useState<FormState>({ email: "", password: "", emailError: null, passwordError: null, errors: null });

    const { dispatchLogin, dispatchSignup, loading, error } = useAuthContext();

    // Function to handle signup

    const handleSignupButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { email, password, errors } = formState;

        // handle client validation errors
        if (errors || formState.emailError || formState.passwordError) {
            console.log("Form has errors, cannot submit.");
            console.log("Client validation errors:", errors);
            return;
        }
        dispatchSignup(email, password);
        // Redirect to login page after successful signup
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let emailError = formState.emailError;
        let passwordError = formState.passwordError;
        let errors = formState.errors

        // regex later for email validation
        if (name === "email") {
            if (value.length === 0) {
                emailError = "Email is required";
            } else {
                emailError = null;
            }
        }

        if (name === "password") {
            if (value.length === 0) {
                passwordError = "Password is required";
            } else if (value.length < 8) {
                passwordError = "Password must be at least 8 characters";
            } else {
                passwordError = null;
            }
        }

        setFormState({
            ...formState,
            [name]: value,
            emailError,
            passwordError,
            errors
        });

    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="Enter email"
                        isValid={formState.email.length > 0 && formState.emailError === null}
                        isInvalid={formState.emailError !== null}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formState.emailError}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleFormChange}
                        placeholder="Password"
                        isValid={formState.password.length > 0 && formState.passwordError === null}
                        isInvalid={formState.passwordError !== null}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formState.passwordError}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Button variant="primary" onClick={handleSignupButtonClick}>
                Submit
            </Button>
        </Form>
    );
};

export default SignupComponent;