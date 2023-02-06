import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from "@testing-library/react";
import QuestionSummary from '../components/features/QuestionSummary/QuestionSummary';

describe('QuestionSummary', () => {
    it('will match snapshot', () => {
        const view = render(
            <HashRouter>
                <QuestionSummary />
            </HashRouter>
        );
        expect(view).toMatchSnapshot();
    })
});