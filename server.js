import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

// === env ===
import dotenv from 'dotenv';

// === graphql ===
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import schema from './graphql/schema.js';

// === db ===
import initDB from './database/index.js';

dotenv.config();
initDB();

const app = new Koa();
const router = new Router({ prefix: '/api' });

router
  .get('/', ctx => {
    ctx.body = 'Swagger here';
  })
  .get('/users', async ctx => {
    ctx.body = `${ctx.request.method}: ${ctx.request.url}`;
  });

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .use(
    mount(
      '/graphql',
      graphqlHTTP({
        schema: schema,
        graphiql: true,
      }),
    ),
  );

app.listen(process.env.PORT || 5000);

app.on('error', ({ message }) => console.log(message));
