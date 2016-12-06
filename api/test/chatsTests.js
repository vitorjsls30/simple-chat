const request = require('supertest');
const should = require('should');
const app = require('../../app').api;

before((done) => {
  request(app)
  .get('/chats/setup')
  .expect(200)
  .end((err) => {
    if(err) {
      done(err);
    } else {
      done();
    }
  });
});

describe('Chat Messages Routes', (done) => {

  it('should retrieve all the chat messages', (done) => {
    request(app)
    .get('/chats')
    .expect(200)
    .end((err) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should retrieve all chats from a room', (done) => {
    request(app)
    .get('/chats/NodeJs')
    .expect(200)
    .expect((res) => {
      res.body.length.should.be.above(0);
    })
    .end((err) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

  it('should post a new chat message', (done) => {
    var chatMessage = {
      content: 'mock chat message',
      roomName: 'NodeJs',
      userName: 'Phill'
    }
    request(app)
    .post('/chats')
    .send(chatMessage)
    .expect(200)
    .end((err) => {
      if(err) {
        done(err);
      }
      else {
        done();
      }
    });
  });

  it('should remove all chat messages', (done) => {
    request(app)
    .del('/chats')
    .expect(200)
    .end((err) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    });
  });

});
