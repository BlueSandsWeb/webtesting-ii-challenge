import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'jest-dom/extend-expect';
import Display from './components/Display/Display';
import Dashboard from './components/Dashboard/Dashboard';

import { render, fireEvent, cleanup } from 'react-testing-library';

afterEach(cleanup)

describe('<App />', () => {
  it('App renders without crashing', () => {
    render(<App />);
  })

  test('<Display /> rendered without crashing', () => {
    const { getByText } = render(<App />);
    getByText(/Score Console/i);
  })

  test('<Dashboard /> rendered without crashing', () => {
    const { getByText } = render(<App />);
    getByText(/Score Dashboard/i);
  })

  // strikes increase when strikes button clicked
  describe('Strike Button', () => {

    test('strikes count is 0', () => {
      const { getByText } = render(<App />);
      getByText(/strikes: 0/i);
    })

    test('strikes count increases when strikes button pressed', () => {
      const { getByText } = render(<App />);
      const strikesBtn = document.querySelector('.strikesBtn');
      fireEvent.click(strikesBtn);
      getByText(/strikes: 1/i)
    })

    test('strikes count increases to two when strikes button pressed twice', () => {
      const { getByText, debug } = render(<App />);
      const strikesBtn = document.querySelector('.strikesBtn');
      fireEvent.click(strikesBtn);
      fireEvent.click(strikesBtn);
      getByText(/strikes: 2/i)
    })

    test('strikes count rolls over to zero when there are three strikes, also increases outs by one', () => {
      const { getByText, debug } = render(<App />);
      const strikesBtn = document.querySelector('.strikesBtn');
      fireEvent.click(strikesBtn);
      fireEvent.click(strikesBtn);
      fireEvent.click(strikesBtn);
      getByText(/strikes: 0/i)
      getByText(/outs: 1/i)
    })
  })

  describe('Ball Button', () => {

    test('balls count increases when ball button clicked', () => {
      const { getByText } = render(<App />);
      const ballsBtn = document.querySelector('.ballsBtn');
      fireEvent.click(ballsBtn);
      getByText(/balls: 1/i);
    })
    test('balls count resets to 0 when ball count gets above 3', () => {
      const { getByText } = render(<App />);
      const ballsBtn = document.querySelector('.ballsBtn');
      fireEvent.click(ballsBtn);
      fireEvent.click(ballsBtn);
      fireEvent.click(ballsBtn);
      getByText(/balls: 3/i);
      fireEvent.click(ballsBtn);
      getByText(/balls: 0/i);
    })
    test('balls count resets strikes when ball count resets', () => {
      const { getByText } = render(<App />);
      const ballsBtn = document.querySelector('.ballsBtn');
      const strikesBtn = document.querySelector('.strikesBtn');
      fireEvent.click(strikesBtn);
      getByText(/strikes: 1/i);
      fireEvent.click(ballsBtn);
      fireEvent.click(ballsBtn);
      fireEvent.click(ballsBtn);
      fireEvent.click(ballsBtn);
      getByText(/balls: 0/i);
      getByText(/strikes: 0/i);
    })

  })

  describe('Foul Button', () => {
    it('Strike count increases when foul button clicked', () => {
      const { getByText } = render(<App />);
      const foulsBtn = document.querySelector('.foulsBtn');
      fireEvent.click(foulsBtn);
      getByText(/strikes: 1/i);
    })

    it("Foul button won't increase strikes if strikes === 2", () => {
      const { getByText } = render(<App />);
      const foulsBtn = document.querySelector('.foulsBtn');
      fireEvent.click(foulsBtn);
      fireEvent.click(foulsBtn);
      fireEvent.click(foulsBtn);
      getByText(/strikes: 2/i);
    })
  })

  describe('hit Button', () => {
    test('when hit button is clicked strikes and balls are reset to 0, outs are unchanged', () => {
      const { getByText } = render(<App />);
      const hitBtn = document.querySelector('.hitBtn');
      const ballsBtn = document.querySelector('.ballsBtn');
      const strikesBtn = document.querySelector('.strikesBtn');
      const strikes = document.getElementsByClassName('pStrikes')[0];
      const balls = document.querySelector('.pBalls');

      fireEvent.click(strikesBtn);
      fireEvent.click(ballsBtn);
      expect(strikes).toHaveTextContent('Strikes: 1');
      expect(balls).toHaveTextContent(/Balls: 1/i);

      fireEvent.click(hitBtn);
      expect(strikes).toHaveTextContent('Strikes: 0');
      expect(balls).toHaveTextContent(/Balls: 0/i);
    })
  })

  // describe('testing', () => {
  //   test('testing', () => {
  //     const { getByText } = render(<App />);
  //     const p = getByText(/strikes: 0/i);
  //     expect(p).toHaveTextContent(/strikes: 0/i);
  //   })
  // })

})