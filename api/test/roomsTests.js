const request = require('supertest');
const mongoose = require('mongoose');
const should = require('should');
const app = require('../../app');
const config = require('../../config');

before((done) => {
  mongoose.connect(config.db.mongodb);

  request(app)
  .get('/rooms/setup')
  .expect(200)
  .end((err) => {
    if(err) {
      done(err);
    } else {
      done();
    }
  });
});

describe('Rooms Routes', () => {

  it('should retrieve all the rooms', (done) => {
    request(app)
    .get('/rooms')
    .expect(200)
    .end((err, res) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should post a new room', (done) => {
    var room = {
      description: 'Test Description',
      name: 'Test-Room'
    };
    request(app)
    .post('/rooms')
    .send(room)
    .end((err, res) => {
      if(err) {
        done(err);
      } else {
        res.status.should.be.equal(200);
        done();
      }
    });
  });

  it('should retrieve a room by its name', (done) => {
    request(app)
    .get('/rooms/NodeJs')
    .send({roomName: 'NodeJs'})
    .expect((res) => {
      res.body.room[0].should.have.property('name', 'NodeJs')
    })
    .expect(200)
    .end((err, res) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should remove all existing room', (done) => {
    request(app)
    .del('/rooms')
    .expect(200)
    .end((err, res) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

});
