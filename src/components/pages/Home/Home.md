# Home Component

## Requirements

- [X] Once the user logs in, the user should be able to toggle between his/her answered and unanswered polls on the home page, which is located at the root. 
- [] The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom). 
- [X] The unanswered polls should be shown by default, and the name of the logged in user should be visible on the page.
- [] Each polling question should link to the details of that poll. The details of each poll should be available at questions/:question_id.

- [] When a poll is clicked on the home page, the following is shown:

1. Text “Would You Rather”;
2. Avatar of the user who posted the polling question; and
3. Two options.

- [] For answered polls, each of the two options contains the following:

1. Text of the option;
2. Number of people who voted for that option; and
3. Percentage of people who voted for that option.

- [] The option selected by the logged-in user should be clearly marked.

- [] Since we want to make sure our application creates a good user experience, the application should show a 404 page if the user is trying to access a poll that does not exist. (Please keep in mind that newly created polls will not be accessible at their url because of the way the backend is set up in this application.) 
- [] It should also display a navigation bar so that the user can easily navigate anywhere in the application.

- [] Upon voting in a poll, all of the information of an answered poll should be displayed.
- [] The user’s response should be recorded and clearly visible on the poll details page. 
- [] Users can only vote once per poll; they shouldn’t be allowed to change their answer after they’ve voted -- no cheating allowed! When the user comes back to the home page, the polling question should appear in the “Answered” column.