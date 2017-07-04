require('babel-register');

let config = require('./config').default;

const checkIfDBSettingsConfigured = () => {
  if(config && config.DATABASE &&
      ((config.DATABASE.url && config.DATABASE.url != '') ||
      ((config.DATABASE.name && config.DATABASE.name != ""
      && config.DATABASE.host && config.DATABASE.host != ""
      && config.DATABASE.port && config.DATABASE.port != ""
      && config.DATABASE.dialect && config.DATABASE.dialect != "")))) {
    return true;
  }
  return false;
}

const createServer = ()=>{
  const app = require('./index').default;
  const port = process.env.PORT || config.port || 8080;
  app.createServer().listen(port, function onListen(err) {
    if (err) throw err;
    console.info('Wize Loan Pricer Listening on Port %s', this.address().port);
  });
};

const authenticateAndStart = ()=>{
  const createModels = require('./models').default;
  const Source = require('./sources/postgresql').default;
  Source.authenticate().then(function(){
    console.info('Connected to DB, Starting App...');
    createModels(!!null, !!null, (config.ENVIRONMENT==='dev')).then(function(){
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
};

if(checkIfDBSettingsConfigured()) {
  authenticateAndStart();
} else {
  createServer();
}





