import * as React from 'react';
import { Provider } from 'react-redux';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import CreateUserForm from '../components/pages/Login/CreateUserForm';
import configureStore from 'redux-mock-store';

describe('QuestionSummary', () => {
    const initialState = {
        status: 'idle',
        error: null,
        isLoadingUsers: false,
        isSavingNewUser: false,
        users: {},
    };
    const mockStore = configureStore();
    let store;

    // - [X]  On the login/CreateUserForm page, verify that a user name field, password field, and submit button are present on the page.
    it('will have all expected fields', () => {
        store = mockStore(initialState);

        render(
            <Provider store={store}>
                <CreateUserForm />
            </Provider>
        );
        const labels = screen.getAllByText(/create/i);
        expect(labels.length).toEqual(1);

        const firstNameInput = screen.getByTestId('first-name-input');
        const lastNameInput = screen.getByTestId('last-name-input');
        const passwordInput = screen.getByTestId('user-id-input');
        const userIdInput = screen.getByTestId('password-input');

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(userIdInput).toBeInTheDocument();

        const createButton = screen.getByTestId('create-submit-button');
        expect(createButton).toBeInTheDocument();
    });

    // - [X] Write a DOM test for at least one file which uses the fireEvent function. For example use fireEvent.click() for clicking a button and verifying that something changed in a component or fireEvent.change() to add text to an input field or select an option in a dropdown. After doing this, verify the UI changed in some way using the expect() method from jest.
    it('will not display error if successful', () => {
        let createInputSubmission = {};
        const handleSubmitCreateData = (data) => {
            createInputSubmission = { ...data };
        }

        store = mockStore(initialState);
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <CreateUserForm handleSubmitCreateData={handleSubmitCreateData} />
            </Provider>
        );

        const firstNameInput = screen.getByTestId('first-name-input');
        fireEvent.change(firstNameInput, { target: { value: 'Steve' } });
        const lastNameInput = screen.getByTestId('last-name-input');
        fireEvent.change(lastNameInput, { target: { value: 'Test' } });
        const passwordInput = screen.getByTestId('user-id-input');
        fireEvent.change(passwordInput, { target: { value: 'stest' } });
        const userIdInput = screen.getByTestId('password-input');
        fireEvent.change(userIdInput, { target: { value: '123456' } });

        const createButton = screen.getByTestId('create-submit-button');
        expect(createButton).toBeInTheDocument();
        fireEvent.click(createButton);
        expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
        expect(createInputSubmission).toEqual({ id: 'stest', password: '123456', name: 'Steve Test' });
        expect(store.dispatch).toHaveBeenCalled();
    });

    // - [X]  Verify that a user gets alerted if error in users store on clicking create user button.
    it('will display error when store has the error', () => {
        initialState.users.error = { message: 'user id is missing' };
        const handleSubmitCreateData = jest.fn();
        store = mockStore(initialState);
        store.dispatch = jest.fn();
        render(
            <Provider store={store}>
                <CreateUserForm handleSubmitCreateData={handleSubmitCreateData} />
            </Provider>
        );

        const createButton = screen.getByTestId('create-submit-button');
        fireEvent.click(createButton);
        const errorAlert = screen.getByTestId('error-header');
        expect(errorAlert).toBeInTheDocument();
        expect(handleSubmitCreateData).toHaveBeenCalledWith({ "id": null, "name": "null null", "password": null });
    });
});