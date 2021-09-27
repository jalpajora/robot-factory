import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { robots } from './db.json';

export const server = setupServer(
  rest.get('/robots', (req, res, ctx) => {
    return res(ctx.json(robots));
  })
);
