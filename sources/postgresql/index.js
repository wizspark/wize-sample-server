import module from '@wize/sequelize-source';
import crud from '@wize/sequelize-runtime';
import path from 'path';
import config from './config.json';

let source = new module(config);
export default source;

export function init() {

    if(!source.invalid) {
        console.info("****** Creating crud api's");
        crud(this.app, path.join(__dirname, "../../", "models"), source);
    }

}