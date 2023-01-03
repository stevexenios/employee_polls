# Unit Testing
## Overview
- All tests are in `src/tests` directory. 
## Requirements
You will also be expected to write at least ten unit tests for the project. The first six should be the following:

### Tests in `src/tests/_DATA.test.js`
- [X] For the _DATA.js file, write an async unit test for _saveQuestion to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
- [X] For the _DATA.js file, write an async unit test for _saveQuestion to verify that an error is returned if incorrect data is passed to the function.

- [X] For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that the saved question answer is returned and all expected fields are 1. populated when correctly formatted data is passed to the function.
- [X] For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that an error is returned if incorrect data is passed to the function.

- [X] For the _DATA.js file, write an async unit test for _saveNewUser to verify that correct new user data resolves successfully. (1 of 4)
- [X] For the _DATA.js file, write an async unit test for _saveNewUser to verify that an error is returned if incorrect data is passed to the function. (2 of 4)

### Tests in `src/tests/QuestionSummarySnapshot.test.js` (snapshot in `src/tests/__snapshots__`)
- [X] Write a snapshot test for at least one file.
  
### Tests in `src/tests/CreateUserFormDom.test.js`
- [X] Write a DOM test for at least one file which uses the fireEvent function. For example use fireEvent.click() for clicking a button and verifying that something changed in a component or fireEvent.change() to add text to an input field or select an option in a dropdown. After doing this, verify the UI changed in some way using the expect() method from jest.
- [X]  On the login/CreateUserForm page, verify that a user name field, password field, and submit button are present on the page. (3 of 4)
- [X]  Verify that a user gets alerted if error in users store on clicking create user button. (4 of 4)

In the software industry, unit tests are typically written during the development process rather than after a project is completed. We encourage you to write these unit tests as you build the project out rather than saving them for the end. This will help you identify and fix bugs earlier in the process.
