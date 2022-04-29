import { render, cleanup } from '@testing-library/react';
import App from "./App";

describe('Tag', () => {
  const { baseElement } = render(<App />)

    afterAll(cleanup);

    it('should render successfully', () => {
        expect(baseElement).toBeTruthy()
    });
})