require('babel-register');

const createServer = ()=>{
  const app = require('./index').default;
  const port = process.env.PORT || 8080;
  app.createServer().listen(port, function onListen(err) {
    if (err) throw err;
    console.info('Application listening on Port %s', this.address().port);
  });
};
let restartCount = 0;
let timeout;
const authenticateAndStart = ()=>{
  const Source = require('./sources/postgresql').default;
  if(restartCount===3) {
    clearTimeout(timeout);
    process.exit(1);
  }
  if(!Source.invalid) {
    const createModels = require('./models').default;
    Source.authenticate().then(function(){
      console.info('Connected to DB, Starting App...');
      createModels(!!null, !!null).then(function(){
        try{
          createServer();
        }
        catch(ex){
          console.error(`Error while starting server: ${ex.message}`);
          throw ex;
        }
      });
    }).catch(function(error){
      restartCount++;
      console.error(error);
      console.error('Not Connected trying again...');
      clearTimeout(timeout);
      timeout = setTimeout(authenticateAndStart, 4000);
    })
  } else {
    console.info('DB not configured in the application.');
    createServer();
  }
};
authenticateAndStart();