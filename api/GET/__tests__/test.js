import request from 'supertest';
import app from '../../../';

describe('check server health check', () => {
  let server;

  before(async() => {
    server = app.createServer();
  });

  it('should get 200 for health check', (done) => {
    request(server)
      .get('/api/')
      .expect(200, (err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
