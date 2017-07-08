import module from '@wize/sequelize-source';
import crud from '@wize/sequelize-runtime';
import path from 'path';
import config from './config.json';

let source = new module(config);
export default source;

export function init() {

    console.info("****** Creating crud api's");
    if(!source.invalid)
        crud(this.app, path.join(__dirname, "../../", "models"), source);

}