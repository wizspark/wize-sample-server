import runtime from '@wize/runtime-load-routes';
import * as sourceList from '../sources';

export default (app, dirname)=>{
    dirname = dirname || __dirname;
    console.info(`****** Creating api's for dir: ${dirname}`);
    runtime(app, dirname, {
        isAPI: true
    });

    console.log("Initialize source apis");
    sourceList.default.call({app: app});
    console.log("Initialized source apis");
}