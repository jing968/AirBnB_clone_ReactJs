import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import AvaliabilityCard from '../Components/AvaliabilityCard';

afterEach(() => {
  cleanup();
});

test('should render start date of avaliability card', () => {
  const placeHolder = () => {};
  render(<AvaliabilityCard start={'2021-12-03'} end={'2021-12-09'} avaliability={[]} setAvaliability={placeHolder} />)
  const startDate = screen.getByDisplayValue('2021-12-03');
  expect(startDate).toBeInTheDocument();
})

test('should render end date of avaliability card', () => {
  const placeHolder = () => {};
  render(<AvaliabilityCard start={'2021-12-03'} end={'2021-12-09'} avaliability={[]} setAvaliability={placeHolder} />)
  const endDate = screen.getByDisplayValue('2021-12-09');
  expect(endDate).toBeInTheDocument();
});

test('should render remove button of avaliability card', () => {
  const placeHolder = () => {};
  render(<AvaliabilityCard start={'2021-12-03'} end={'2021-12-09'} avaliability={[]} setAvaliability={placeHolder} />)
  const Remove = screen.getByText('Remove');
  expect(Remove).toBeInTheDocument();
});

test('should alter the given array when remoe button is clicked', () => {
  let avaliability = [
    {
      start: '2021-11-27',
      end: '2021-11-30'
    },
    {
      start: '2021-12-03',
      end: '2021-12-09'
    }
  ];
  const origin = avaliability;
  const setAvaliability = (newArr) => {
    avaliability = newArr;
  }
  render(<AvaliabilityCard start={'2021-12-03'} end={'2021-12-09'} avaliability={avaliability} setAvaliability={setAvaliability} />)
  const Remove = screen.getByText('Remove');
  expect(avaliability === origin).toBe(true);
  Remove.click();
  expect(avaliability === origin).toBe(false);
});

test('should remove the given start date + end date record from the array when clicked', () => {
  let avaliability = [
    {
      start: '2021-11-27',
      end: '2021-11-30'
    },
    {
      start: '2021-12-03',
      end: '2021-12-09'
    }
  ];
  const expected = [{ start: '2021-11-27', end: '2021-11-30' }];
  const setAvaliability = (newArr) => {
    avaliability = newArr;
  }
  render(<AvaliabilityCard start={'2021-12-03'} end={'2021-12-09'} avaliability={avaliability} setAvaliability={setAvaliability} />)
  const Remove = screen.getByText('Remove');
  Remove.click();
  expect(avaliability.length).toBe(expected.length);
  expect(avaliability[0].start === expected[0].start).toBe(true);
  expect(avaliability[0].end).toBe(expected[0].end);
});
