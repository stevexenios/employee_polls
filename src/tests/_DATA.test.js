import { _saveQuestion, _saveQuestionAnswer } from "../api/_DATA";

describe('_DATA', () => {
    describe('_saveQuestion', () => {
        it('saved question is returned and all expected fields are populated when correctly formatted data is passed to the function', async () => {
            const question = {
                author: 'smwangi',
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

        it('error is returned if incorrect data is passed to the function', async () => {
            const question = {
                author: 'smwangi',
                optionOneText: 'Run a mile'
            };

            await expect(_saveQuestion(question)).rejects.toBe('Please provide optionOneText, optionTwoText, and author');
        });
    });

    describe('_saveQuestionAnswer', () => {
        it('saved question answer is returned and all expected fields are 1. populated when correctly formatted data is passed to the function', async () => {
            const questionAnswered = {
                authedUser: 'smwangi',
                qid: '8xf0y6ziyjabvozdd253nd',
                answer: 'optionOne'
            };

            await expect(_saveQuestionAnswer(questionAnswered)).resolves.toBe(true);
        });
        
        it('error is returned if incorrect data is passed to the function', async () => {
            const questionAnswered = {
                authedUser: 'smwangi',
                qid: '8xf0y6ziyjabvozdd253nd',
            };

            await expect(_saveQuestionAnswer(questionAnswered)).rejects.toBe('Please provide authedUser, qid, and answer');
        });
    });
});