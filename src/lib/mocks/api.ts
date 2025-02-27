import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockUser } from './user';

export const handlers = [
  rest.post('/api/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'mock-token',
        user: mockUser,
      })
    );
  }),

  rest.get('/api/profile', (req, res, ctx) => {
    return res(ctx.json(mockUser));
  }),

  rest.put('/api/profile', async (req, res, ctx) => {
    const updatedData = await req.json();
    return res(
      ctx.json({
        ...mockUser,
        ...updatedData,
      })
    );
  }),
];

export const server = setupServer(...handlers);