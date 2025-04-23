import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/analyze', (req, res, ctx) => {
    return res(
      ctx.json({
        entities: [
          { text: "R$ 1,2 bilhão", type: "MONEY" },
          { text: "15%", type: "PERCENTAGE" }
        ],
        sentiment: {
          label: "positive",
          score: 0.85
        }
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders document upload section', () => {
  render(<App />);
  expect(screen.getByText(/Análise de Documentos/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Upload/i })).toBeInTheDocument();
});

test('handles document upload', async () => {
  render(<App />);
  
  const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
  const input = screen.getByLabelText(/upload/i);
  
  fireEvent.change(input, { target: { files: [file] } });
  
  await waitFor(() => {
    expect(screen.getByText(/R\$ 1,2 bilhão/i)).toBeInTheDocument();
    expect(screen.getByText(/Sentimento: Positivo/i)).toBeInTheDocument();
  });
});

test('displays loading state during analysis', async () => {
  render(<App />);
  
  const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
  const input = screen.getByLabelText(/upload/i);
  
  fireEvent.change(input, { target: { files: [file] } });
  
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
}); 