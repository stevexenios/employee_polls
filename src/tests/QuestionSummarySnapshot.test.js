import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from "@testing-library/react";
import QuestionSummary from '../components/features/QuestionSummary/QuestionSummary';

describe('QuestionSummary', () => {
    it('will match snapshot', () => {
        const view = render(
            <BrowserRouter>
                <QuestionSummary />
            </BrowserRouter>
        );
        expect(view).toMatchSnapshot();
    })
});