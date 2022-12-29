# Login Screen Component

## Requirements

- [X] The person using your application should have a way of impersonating/logging in as an existing user.
- [X] Create your own account creation process to allow a user to sign up for an account. 
- [X] Once the user logs in, the home page should be shown.
- [] We always want to make sure we know who the logged in user is, so information about the logged in user should appear on the page. 
- [] If someone tries to navigate anywhere by entering the address in the address bar, the user is asked to sign in and then the requested page is shown. 
- [] The application allows the user to log out and log back in.


## `Login` button

General login or sign in flow (created using using mermaid).
```mermaid
flowchart LR;

subgraph "Login user flow"
    A[Input user name] --> |Enter user name|C[/"'Login' button"/]
    B[Input user password] --> |Enter user password|C
    C --> |onClick|D{fa:fa-spinner Evaluate}
    D --> |AuthenticationError| E(["'Login' page"])
    D --> |Ok 200 response \n login successfully| F(["'Home' page"])
end
```

![Login flow](./diagrams/loginGeneralFlow.png)

## `Create` account button

```mermaid
flowchart TD;

CreateButton[/"'Create' user button"/]
CancelButton[/"'Cancel' button"/]

subgraph "User creation flow"
    A[Input first name] == Enter first name ==> CreateButton
    B[Input last name] == Enter last name ==> CreateButton
    C[Input user Id] == Enter user Id ==> CreateButton
    D[Input password] == Enter your password ==> CreateButton
    CreateButton == onClick ==> G{fa:fa-spinner Evaluate}
    G -- Error --> E(Error response)
    G == Ok 200 response \n New user account created successfully ==> H(Home)
end

subgraph "User creation cancelation flow"
    CancelButton == onClick ==> LoginPage(["Login Page"])
end
```

![Create flow](./diagrams/createUserFlow.png)

## References
1. [Mermaid graph](#https://mermaid.live/)