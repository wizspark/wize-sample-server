import config from './config.json'
let _output = {};
const extensions = Object.keys(config);
for(let ext of extensions) {
    let _item = {};
    if(typeof config[ext] == "object") {
        const keys = Object.keys(config[ext]);
        for(const key of keys) {
            _item[key] = process.env[`${ext.toUpperCase()}_${key.toUpperCase()}`] || config[ext][key];
        }
        _output[ext] = _item;
    }
}
_output['ENVIRONMENT'] = process.env[`ENVIRONMENT`] || config['ENVIRONMENT'];
export default _output;