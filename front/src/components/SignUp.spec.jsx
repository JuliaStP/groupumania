import React from "react";
import SignUp from "../components/SignUp";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = {
  getState: () => ({auth: {isLoggedIn: true}}),
  subscribe: () => {},
  dispatch: () => {}
}  

describe("SignUp", () => {
  it('renders correctly', () => {
    const { getByLabelText  } = render(
        <BrowserRouter>
            <Provider store={mockStore}>
                <SignUp />
            </Provider>
        </BrowserRouter>
    );
    expect(getByLabelText('Email*')).toHaveAttribute('name', 'email');
    expect(getByLabelText('First Name*')).toHaveAttribute('name', 'firstName');
    expect(getByLabelText('Last Name*')).toHaveAttribute('name', 'lastName');
    expect(getByLabelText('Password*')).toHaveAttribute('name', 'password');
})

describe('clicked on sign up button', () => {
    it('opens sign up page', () => {
        window.location= jest.fn();
        const {getByText} = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <SignUp />
                </Provider>
            </BrowserRouter>
        );
        
        fireEvent.click(getByText('Sign In'));
        expect(window.location.pathname).toBe('/');
    });
})

describe('when signed in', () => {
  it('clicked on sign up button', () => {
    window.location= jest.fn();
    render(
      <BrowserRouter>
          <Provider store={mockStore}>
              <SignUp isLoggedIn />
          </Provider>
      </BrowserRouter>
    );
    expect(window.location.pathname).toBe('/main');
  });
});
})