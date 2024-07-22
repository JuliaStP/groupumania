import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import SignIn from '../components/SignIn';
 
const mockStore = {
    getState: () => ({auth: {isLoggedIn: true}}),
    subscribe: () => {},
    dispatch: () => {}
}   

describe('SignIn', () => {
    it('renders correctly', () => {
      const { getByLabelText  } = render(
        <BrowserRouter>
            <Provider store={mockStore}>
                <SignIn />
            </Provider>
        </BrowserRouter>
      );
      expect(getByLabelText('Email*')).toHaveAttribute('name', 'email');
      expect(getByLabelText('Password*')).toHaveAttribute('name', 'password');
    })

    describe('when clicked on sign up button', () => {
        it('opens sign up page', () => {
          window.location= jest.fn();
          const {getByText} = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <SignIn />
                </Provider>
            </BrowserRouter>
          );

          fireEvent.click(getByText('Sign Up'));
          expect(window.location.pathname).toBe('/signup');
        });
    })

    describe('when signed in', () => {
      it('clicked on sign in button', () => {
        window.location= jest.fn();
        render(
          <BrowserRouter>
              <Provider store={mockStore}>
                  <SignIn isLoggedIn />
              </Provider>
          </BrowserRouter>
        );
        expect(window.location.pathname).toBe('/main');
      });
    });
})