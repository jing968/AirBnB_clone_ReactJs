import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import Popup from '../Components/Popup';

afterEach(() => {
  cleanup();
});

test('message and button should render correctly', () => {
  let msg = 'should display';
  const func = () => {
    msg = '';
  }
  render(<Popup observable={msg} setter={func} />)
  const banner = screen.getByText('System Message');
  const text = screen.getByText('should display');
  const button = screen.getByText('Confirm')
  expect(button).toBeInTheDocument();
  expect(banner).toBeInTheDocument();
  expect(text).toBeInTheDocument();
})

test('setter function should run when the button is clicked', () => {
  let msg = 'should display';
  const func = () => {
    msg = '';
  }
  render(<Popup observable={msg} setter={func} />)
  const button = screen.getByText('Confirm');
  expect(msg).toBe('should display');
  button.click();
  expect(msg).toBe('');
})

test('optional second function can be provided, and both function should be called on clicked', () => {
  let msg = 'a';
  const func = () => {
    msg += 'c';
  }
  const func1 = () => {
    msg += 'b';
  }
  render(<Popup observable={msg} setter={func} confirm={func1}/>)
  const button = screen.getByText('Confirm');
  expect(msg).toBe('a');
  button.click();
  expect(msg).toBe('abc');
})

test('undefined inputs as confirm arguments should be handled and not cause error', () => {
  let msg = 'should display';
  const func = () => {
    msg = '';
  }
  render(<Popup observable={msg} setter={func} confirm={undefined}/>)
  const button = screen.getByText('Confirm');
  button.click();
  expect(msg).toBe('');
})
