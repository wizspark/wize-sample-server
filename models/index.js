
import app from '../app';
import dataSource from '../sources/postgresql';
export default (source, application, sync)=> {
    let appDataSource, appInstance;
    if(source)
        appDataSource = source;
    else
        appDataSource = dataSource;

    if(application)
        appInstance = application;
    else
        appInstance = app;
    
    if(appDataSource.invalid)
        return false;
    appDataSource.readModelsFromDirectory(__dirname);
    sync = sync || false;
    return appDataSource.sync({force: sync});
};
