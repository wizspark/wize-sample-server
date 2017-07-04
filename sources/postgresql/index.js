
import SequelizeSource from '@wize/sequelize-source';
import config from '../../config';

let source;

if(config.DATABASE.url && config.DATABASE.url != '') {
    source = new SequelizeSource(config.DATABASE.url, {
        logging:false,
        pool: {
            max: 1,
            min: 0,
            idle: 10000
        }
    });
} else {
    source = new SequelizeSource(config.DATABASE.name,
        config.DATABASE.user,
        config.DATABASE.password, {
            host: config.DATABASE.host,
            port: config.DATABASE.port,
            dialect: config.DATABASE.dialect,
            logging:false,
            pool: {
                max: 1,
                min: 0,
                idle: 10000
            }
        });
}

export default source;

