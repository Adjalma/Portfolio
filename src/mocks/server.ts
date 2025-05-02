import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { RestRequest, RestContext } from 'msw';

export const server = setupServer(
  rest.get('/api/wells', (req: RestRequest, res, ctx: RestContext) => {
    return res(
      ctx.json([
        {
          id: '1',
          well_id: 'WELL-001',
          timestamp: '2024-03-19T10:00:00Z',
          pressure: 2000,
          temperature: 80,
          flow_rate: 100,
          status: 'normal'
        }
      ])
    );
  }),

  rest.get('/api/alerts', (req: RestRequest, res, ctx: RestContext) => {
    return res(
      ctx.json([
        {
          id: '1',
          well_id: 'WELL-001',
          timestamp: '2024-03-19T10:00:00Z',
          type: 'warning',
          message: 'High pressure detected'
        }
      ])
    );
  })
);