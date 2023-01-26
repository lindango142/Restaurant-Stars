import React from 'React';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react';
import { initialize } from "@googlemaps/jest-mocks";

import App from '../client/App';
import Restaurants from '../client/components/Restaurants';
import store from '../client/store';

describe('Unit testing React components', () => {
  describe('Restaurants', () => {
    let text;
    const props = {
      restaurantList: {
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      },
      updateRev: jest.fn(),
      changeStatus: jest.fn(),
      edit: false,
      editActionCreator: jest.fn(),
      addCard: jest.fn(),
      deleteCard: jest.fn(),
    };

    beforeEach(() => {
      text = render(<Restaurants {...props} />);
    });

    test('A Restaurant should display the name, location, and status', () => {
      expect(text.getByRole('heading')).toHaveTextContent(props.restaurantList.name);
      expect(text.getByText(`${props.restaurantList.address}`)).toBeInTheDocument();
      expect(text.getByText(`${props.restaurantList.status}`)).toBeInTheDocument();
    });

    test('It should also contain three buttons for rating the restaurants and delete card', async () => {
      const button = await text.findAllByRole('button');
      expect(button.length).toBe(3);
      expect(button[0]).toHaveTextContent('X');
    });

    test('The functions passed down should be invoked on click', async () => {
      const button = await text.findAllByRole('button');
      userEvent.click(button[0]);
      expect(props.deleteCard).toHaveBeenCalledTimes(1);
      userEvent.click(button[1]);
      expect(props.deleteCard).toHaveBeenCalledTimes(1);
      expect(props.changeStatus).toHaveBeenCalledTimes(1);
      userEvent.click(button[2]);
      expect(props.deleteCard).toHaveBeenCalledTimes(1);
      expect(props.changeStatus).toHaveBeenCalledTimes(2);
    });
  });
});

describe('React-Redux integration tests', () => {
  describe('Empty state before interactions', () => {
    let app;
    beforeEach(async () => {
      initialize();
      app = await render(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>);
    });

    test('The page loads with Sign in button', async () => {
      const button = await app.findAllByRole('button');
      expect(button.length).toBe(1);
      expect(button[0]).toHaveTextContent('Sign in')
    });

    test('The page loads with Sign in inputs', async () => {
      const inputs = await app.findAllByRole('textbox');
      expect(inputs.length).toBe(1);
      const passwordField = app.getByLabelText("Password");
      expect(passwordField).toBeInTheDocument();
    });

    test('The home page loads when sign in button is clicked', async () => {
      const button = await app.findAllByRole('button');
      userEvent.click(button[0]);
      const button2 = await app.findAllByRole('button');
      expect(button2[0]).toHaveTextContent('Add')
    });
  });

});