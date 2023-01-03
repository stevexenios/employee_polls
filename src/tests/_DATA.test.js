import { _saveQuestion, _saveQuestionAnswer, _saveNewUser } from "../api/_DATA";

describe('_DATA', () => {
    describe('_saveQuestion', () => {
        // - [X] For the _DATA.js file, write an async unit test for _saveQuestion to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.
        it('saved question is returned and all expected fields are populated when correctly formatted data is passed to the function', async () => {
            const question = {
                author: 'mtsamis',
                optionOneText: 'Run a mile',
                optionTwoText: 'Walk 10 miles'
            };

            const { id, timestamp, author, optionOne, optionTwo } = await _saveQuestion(question);
            expect(id).toBeDefined();
            expect(timestamp).toBeDefined();
            expect(author).toEqual(question.author);
            expect(optionOne.text).toEqual(question.optionOneText);
            expect(optionOne.votes).toEqual([]);
            expect(optionTwo.text).toEqual(question.optionTwoText);
            expect(optionTwo.votes).toEqual([]);

        });

        // - [X] For the _DATA.js file, write an async unit test for _saveQuestion to verify that an error is returned if incorrect data is passed to the function.
        it('error is returned if incorrect data is passed to the function', async () => {
            const question = {
                author: 'mtsamis',
                optionOneText: 'Run a mile'
            };

            await expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
        });
    });

    describe('_saveQuestionAnswer', () => {
        // - [X] For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that the saved question answer is returned and all expected fields are 1. populated when correctly formatted data is passed to the function.
        it('saved question answer is returned and all expected fields are 1. populated when correctly formatted data is passed to the function', async () => {
            const questionAnswered = {
                authedUser: 'mtsamis',
                qid: '8xf0y6ziyjabvozdd253nd',
                answer: 'optionOne'
            };

            await expect(_saveQuestionAnswer(questionAnswered)).resolves.toBe(true);
        });
        
        // - [X] For the _DATA.js file, write an async unit test for _saveQuestionAnswer to verify that an error is returned if incorrect data is passed to the function.
        it('error is returned if incorrect data is passed to the function', async () => {
            const questionAnswered = {
                authedUser: 'zoshikanlu',
                qid: '8xf0y6ziyjabvozdd253nd',
            };

            await expect(_saveQuestionAnswer(questionAnswered)).rejects.toBe('Please provide authedUser, qid, and answer');
        });
    });

    describe('_DATA', () => {
        describe('_saveNewUser', () => {
            // - [X] For the _DATA.js file, write an async unit test for _saveNewUser to verify that correct new user data resolves successfully. (1 of 4)
            it('successfully saves a new user', async () => {
                const newUser = {
                    id: 'stest',
                    password: '123456',
                    name: 'Steve Test',
                }
    
                await expect(_saveNewUser(newUser)).resolves.toBe(true); 
            });
    
            // - [X] For the _DATA.js file, write an async unit test for _saveNewUser to verify that an error is returned if incorrect data is passed to the function. (2 of 4)
            it('error is returned if incorrect data is passed to the function', async () => {
                await expect(_saveNewUser({})).rejects.toBe('Please provide userId, userPassword, and userName');
            });
        });
    });
});