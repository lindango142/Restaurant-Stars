const request = require('supertest');
// const { default: RestaurantsDisplay } = require('../client/components/RestaurantsDisplay');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/restaurants', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/restaurants')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('restaurants from database are in body of response', (done) => {
        request(server)
          .get('/restaurants')
          .then(response => {
            expect(Array.isArray(response.body)).toEqual(true);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
    });

    describe('POST', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: "Los Angeles",
            status: "not visited",
            review: "",
            marks: { lat: 34.0522, lng: 118.2437}
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });

      it('responds with the status of done', () => {
        return request(server)
          .post('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: "Los Angeles",
            status: "not visited",
            review: "",
            marks: { lat: 34.0522, lng: 118.2437}
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.body).toEqual('done')
          })
      });

      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .put('/restaurants')
          .send([{ hi: 'hi' }])
          .expect(400)
          .then(response => {
            expect(response.body.error).toBeDefined();
          });
      });

    });

    describe('PUT', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .put('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: 'Los Angeles',
            status: "recommended",
            review: "",
            marks: {
              lat: 34.0522,
              lng: 118.2437,
            },
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });

      it('responds with the status of done', () => {
        return request(server)
          .post('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: "Los Angeles",
            status: "not visited",
            review: "",
            marks: { lat: 34.0522, lng: 118.2437}
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.body).toEqual('done')
          })
      });

      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .put('/restaurants')
          .send([{ hi: 'hi' }])
          .expect(400)
          .then(response => {
            expect(response.body.error).toBeDefined();
          });
      });

    });

    describe('DELETE', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .delete('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: 'Los Angeles',
            status: "not visited",
            review: "",
            marks: {
              lat: 34.0522,
              lng: 118.2437,
            },
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /application\/json/)
          .expect(200)
      });

      it('responds with the status of done', () => {
        return request(server)
          .post('/restaurants')
          .send({
            id: 1,
            name: "Marugame Udon",
            address: "Los Angeles",
            status: "not visited",
            review: "",
            marks: { lat: 34.0522, lng: 118.2437}
          })
          .set('Accept', 'application/json')
          .then(response => {
            expect(response.body).toEqual('done')
          })
      });

      it('responds to invalid request with 400 status and error message in body', () => {
        return request(server)
          .put('/restaurants')
          .send([{ hi: 'hi' }])
          .expect(400)
          .then(response => {
            expect(response.body.error).toBeDefined();
          });
      });

    });

  });
});
