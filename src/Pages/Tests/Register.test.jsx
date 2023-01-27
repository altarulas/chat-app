import { fireEvent, render, screen } from "@testing-library/react";

import Register from "../Register";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

test("should set the name input correctly", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const nameInput = screen.getByTestId('name-input');
    expect(nameInput.value).toBe("");

    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
});

test("should set the email input correctly", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput.value).toBe("");

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
});

test("should set the password input correctly", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput.value).toBe("");

    fireEvent.change(passwordInput, { target: { value: "123asd123" } });
    expect(passwordInput.value).toBe('123asd123');
});

test("should click the button and call loginHandler", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const registerButton = screen.getByText("SIGN UP");
    fireEvent.click(registerButton);
});

//FIXME: 
/* test("should select an image when the label is clicked", async () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const imageRef = screen.getByTestId("image-upload")
    const label = screen.getByText("Add an avatar");
    fireEvent.click(label);

    const input = imageRef.current;
    expect(input).toBeTruthy();

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files[0]).toEqual(file);
});
 */

//TODO: navigate login screen test

test("loading element should not be rendered", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const loadingElement = screen.getByTestId("loading-wrapper");
    expect(loadingElement).not.toBe("loading")
});

test("should render loading element when button clicked", () => {
    render(
        <Router location={history.location} navigator={history}>
            <Register />
        </Router>
    )
    const registerButton = screen.getByText("SIGN UP");
    fireEvent.click(registerButton);

    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeTruthy();
});

//TODO: make tests for error case 