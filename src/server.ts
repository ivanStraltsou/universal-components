// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';

// Fix Universal Style
import { NodeDomRootRenderer, NodeDomRenderer, platformUniversalDynamic } from 'angular2-universal/node';
function renderComponentFix(componentProto: any) {
  return new NodeDomRenderer(this, componentProto, this._animationDriver);
}
NodeDomRootRenderer.prototype.renderComponent = renderComponentFix;
// End Fix Universal Style

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { enableProdMode } from '@angular/core';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

const platformRef = platformUniversalDynamic();

declare var Zone: any;

app.set('port', process.env.PORT || 3001);
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));


import { serverApi } from './backend/api';
import { ProductsModule } from './app/products/products.node.module';

// Our API for demos only
app.get('/data.json', serverApi);

function ngApp(req, res) {
  const store = {
    products: [3, 4, 5],
    test: 'server value'
  };

  const data = {
    document: `
      <provider #store [store]="${JSON.stringify(store).replace(/\"/g, '\'')}">
        <product-list [products]="$products | async" [test]="test"></product-list>
      </provider>`,
  };

  const zone = Zone.current.fork({
    name: 'UNIVERSAL request',
    properties: data
  });

  zone.run(() => (platformRef.serializeModule(ProductsModule, data)))
      .then(html => {
        if (typeof html !== 'string') {
          return console.log(null, 'xxx');
        }

        res.render('index', {
          content: html.substring(html.indexOf('<product-list'), html.indexOf('</provider>'))
        });

        console.log(html);
      });
}

// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', ngApp);

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
