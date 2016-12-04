const request = require('supertest');
const mongoose = require('mongoose');
const should = require('should');
const app = require('../../app.js');

describe('Routing Tests', () => {

  describe('Rooms Routes', () => {

    it('should retrieve all the rooms', (done) => {
      request(app)
      .get('/rooms')
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        done();
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
          return done(err);
        }
        res.status.should.be.equal(200);
        done();
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
          return done(err);
        }
        done();
      });
    });

  });

});
