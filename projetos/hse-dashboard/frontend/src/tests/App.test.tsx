import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('renders HSE Dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/HSE Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders safety metrics chart', () => {
  render(<App />);
  const chartElement = screen.getByTestId('safety-metrics-chart');
  expect(chartElement).toBeInTheDocument();
});

test('renders alerts panel', () => {
  render(<App />);
  const alertsElement = screen.getByTestId('alerts-panel');
  expect(alertsElement).toBeInTheDocument();
}); 