"use client";

import React, { useEffect } from 'react';
// Client side router
import { useRouter } from 'next/navigation';
// Auth context
import { useAuthContext } from '@/app/context/AuthContext';
// Bootstrap form component for login page
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Link from 'next/link';

type FormState = {
    email: string;
    password: string;
    emailError: string | null;
    passwordError: string | null;
    errors: string[] | null;
}

const LoginComponent: React.FC<{}> = () => {
    // Next router
    const router = useRouter();
    //local form state
    const [formState, setFormState] = React.useState<FormState>({ email: "", password: "", emailError: null, passwordError: null, errors: null });
    // global auth context
    const { dispatchLogin, loading, error, user } = useAuthContext();

    // Function to handle login
    const handleLoginButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const { email, password, errors } = formState;

        // handle client validation errors
        if (errors || formState.emailError || formState.passwordError) {
            console.log("Form has errors, cannot submit.");
            console.log("Client validation errors:", errors);
            return;
        }
        const success = await dispatchLogin(email, password);

        if (success) {
            // Redirect to home page after successful login
            router.push('/home');
            console.log("Login successful");
        } else {
            //handle failed login
            console.log("From Login Component: Login failed");
            // errors are handled in the context
            console.log("From Login Component: ", error);
        }
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

    // redirect to home if already logged in
    useEffect(() => {
        if (user) {
            console.log("User is logged in: ", user);
            // go to home page
            router.push('/home');
        }
    }, [user]);

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
            <Button variant="primary" onClick={handleLoginButtonClick}>
                Login
            </Button>
            <br />
            <Link href="/signup">Don't have an account? Visit Signup Page</Link>
        </Form>
    );
};

export default LoginComponent;