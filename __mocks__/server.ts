import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { robots } from './db.json';

export const server = setupServer(
  rest.get('http://localhost:5000/robots', (req, res, ctx) => {
    // console.log(JSON.stringify(robots));
    return res(ctx.json(robots));
  })
);
