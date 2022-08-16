const supertest = require('supertest');
const app = require('../app');


describe('Testing server routers', () => {
    test('Test when the endpoint is /', (done) => {
        supertest(app)
        .get('/')
        .expect(200)
        .expect("Content-Type", /text\/html/)
        .end((err, res) => {
            if(err) done(err);
            done();
        });
    });
    test('Test when the endpoint in public -> /css/style.css', (done) => {
        supertest(app)
        .get('/css/style.css')
        .expect(200)
        .expect("Content-Type", /text\/css/)
        .end((err, res) => {
            if(err) done(err);
            done();
        });
    });
    test('Test when the endpoint in public and the resource is not found-> /css/notfound.css', (done) => {
        supertest(app)
        .get('/css/notfound.css')
        .expect(404)
        .end((err, res) => {
            if(err) done(err);
            done();
        });
    });
    jest.setTimeout(10000);
    test('Test when the endpoint is for getting sources -> /sources', (done) => {
        supertest(app)
        .get('/sources')
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(JSON.parse(res.text)['sources'][0]['name']).toBeDefined();
            done();
        });
    });
    test('Test when the endpoint is for getting sources -> /search?search=f&language=en&sources=cnn', (done) => {
        supertest(app)
        .get('/search?search=f&language=en&sources=cnn')
        .expect(200)
        .end((err, res) => {
            if(err) done(err);
            expect(JSON.parse(res.text)['articles'][0]['title']).toBeDefined();
            done();
        });
    });
});