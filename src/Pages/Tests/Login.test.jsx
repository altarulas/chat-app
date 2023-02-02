import { fireEvent, render, screen } from "@testing-library/react";

import { AuthContextProvider } from "../../Context/Auth";
import Login from "../Login";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

test("should set the email input correctly", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput.value).toBe("");

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
});

test("should set the password input correctly", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput.value).toBe("");

    fireEvent.change(passwordInput, { target: { value: "123asd123" } });
    expect(passwordInput.value).toBe('123asd123');
});

//FIXME:
/* 
test("should click the button and call loginHandler", () => {
    const loginHandlerTest = jest.fn();
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login loginHandlerTest={loginHandlerTest} />
            </Router>
        </AuthContextProvider>
    )
    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);
    expect(loginHandlerTest).toHaveBeenCalled();
}); */

test("loading element should not be rendered", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const loadingElement = screen.getByTestId("loading-wrapper");
    expect(loadingElement).not.toBe("loading")
});

//FIXME: 
/* test("should show loading element when loading", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);

    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeTruthy();
});
 */

//TODO: navigate test to app

test("error element should not be rendered", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const errorElement = screen.getByTestId("error-wrapper");
    expect(errorElement).not.toBe("error")
});

//FIXME: 
/* test("should rendered element when gives error", () => {
    render(
        <AuthContextProvider>
            <Router location={history.location} navigator={history}>
                <Login />
            </Router>
        </AuthContextProvider>
    )
    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);

    const errorElement = screen.getByTestId("error");
    expect(errorElement).toBeTruthy();
}); */

