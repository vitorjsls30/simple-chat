const request = require('supertest');
const mongoose = require('mongoose');
const should = require('should');
const app = require('../../app.js');

before((done) => {
  request(app)
  .get('/users/setup')
  .expect(200)
  .end((err) => {
    if(err) {
      done(err);
    }
    done();
  });
});

describe('Users Routes', ()=> {

  it('should retrieve all the users', (done) => {
    request(app)
    .get('/users')
    .expect(200)
    .end((err) => {
      if(err) {
        done(err);
      }
      done();
    });
  });

  it('should retrieve a single user by its email', (done) => {
    request(app)
    .get('/users')
    .send({userEmail:'vitorjsls30@gmail.com'})
    .expect(200)
    .expect((res) => {
      res.body[0].should.have.property('email', 'vitorjsls30@gmail.com');
    })
    .end((err) => {
      if(err) {
        throw err;
      }
      done();
    });
  });

  it('should post a new user', (done) => {
    var user = {
      email: 'mockemail@gmail.com'
    };
    request(app)
    .post('/users')
    .send(user)
    .expect(200)
    .end((err, res) => {
      if(err) {
        throw err;
      }
      res.status.should.be.equal(200);
      done();
    });
  });

  it('should remove a single user by its email', (done) => {
    request(app)
    .del('/users')
    .send({userEmail:'vitorjsls30@gmail.com'})
    .expect(200)
    .end((err) => {
      if(err) {
        throw err;
      }
      done();
    });
  });

  it('should remove all users', (done) => {
    request(app)
    .del('/users')
    .expect(200)
    .end((err, res) => {
      if(err) {
        throw err;
      }
      res.status.should.be.equal(200);
      done();
    });
  });

});
