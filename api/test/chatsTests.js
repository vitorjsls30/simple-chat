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

  it('should retrieve a single chat message', (done) => {
    request(app)
    .get('/chats')
    .send({id: '1'})
    .expect(200)
    .expect((res) => {
      res.body[0].should.have.property('id').equal(1);
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
      id: 5,
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

  it('should remove a single chat message', (done) => {
    request(app)
    .del('/chats')
    .send({id: '1'})
    .expect(200)
    .end((err) => {
      if(err) {
        done(err);
      } else {
        done();
      }
    })
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
