require('babel-register');

const createServer = ()=>{
  const app = require('./index').default;
  const port = process.env.PORT || 8080;
  app.createServer().listen(port, function onListen(err) {
    if (err) throw err;
    console.info('Wize Loan Pricer Listening on Port %s', this.address().port);
  });
};

const authenticateAndStart = ()=>{
  const Source = require('./sources/postgresql').default;
  if(!Source.invalid) {
    const createModels = require('./models').default;
    Source.authenticate().then(function(){
      console.info('Connected to DB, Starting App...');
      createModels(!!null, !!null, (process.env[`ENVIRONMENT`] === 'dev')).then(function(){
        try{
          createServer();
        }
        catch(ex){
          console.error(`Error while starting server: ${ex.message}`);
          throw ex;
        }
      });
    }).catch(function(error){
      console.error(error);
      console.error('Not Connected trying again...');
      setTimeout(authenticateAndStart, 2000);
    })
  } else {
    createServer();
  }
};
authenticateAndStart();