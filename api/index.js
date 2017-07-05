import runtime from '@wize/runtime-load-routes';
import crud from '@wize/sequelize-runtime';
import path from "path";

export default (app, dirname)=>{
    dirname = dirname || __dirname;
    console.info(`****** Creating api's for dir: ${dirname}`);
    runtime(app, dirname, {
        isAPI: true
    });
    console.info("****** Creating crud api's");
    const dataSource = require('../sources/postgresql').default;
    if(!dataSource.invalid)
        crud(app, path.join(__dirname, "../", "models"), dataSource);
}