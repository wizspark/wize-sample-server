
import app from '../app';
import dataSource from '../sources/postgresql';
export default (source, application)=> {
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
    return appDataSource.sync();
};
