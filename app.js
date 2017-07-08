import createServer from '@wize/koa-server';
import wizeApis from '@wize/runtime-metadata';
import * as moduleList from './modules';
import source from './sources/postgresql';

const app = createServer({
  bodyparser: {
    jsonLimit: '2mb'
  }
});

new wizeApis(app, __dirname);
moduleList.default.call({app: app, source: source});

export default app;
