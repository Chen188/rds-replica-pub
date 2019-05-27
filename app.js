const Koa = require('koa');
const Router = require('koa-trie-router');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const views = require('koa-views');
const serve = require('koa-static');
const Twig = require('twig');
const twig = Twig.twig;

const Book = require('./models/book');

const app = new Koa();
let books_api = new Router();
let root_api = new Router();

app.use(bodyParser());
app.use(serve('./public'));
app.use(views(__dirname + '/views/', { extension: 'twig', map: {twig: 'twig' }}));

root_api.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
})

books_api
  .get('/', async function(ctx, next) {
    let books = await Book.findAll();
    await ctx.render('books/index', {books})
    // ctx.body = res;
  })
  .post('/', async function (ctx, next) {
    let body = ctx.request.body;
    let {title, desc} = body;
    console.log(body);

    await Book.create({
      title,
      desc
    })

    ctx.redirect('/books')
  });

app.use(mount('/books', books_api.middleware()));
app.use(mount('/', root_api.middleware()));

app.listen(3000);