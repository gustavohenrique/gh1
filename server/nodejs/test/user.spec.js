var expect = require('chai').expect;
var request = require('supertest');
var fixtures = require('sequelize-fixtures');
var app = require('../src/app');

describe('Site API', function() {

    var client = null;
    var models = app.models;
    var server = app.createServer();

    beforeEach(function (done) {
        app.db.sync({ force: true }).then(function () {
            client = request(server);
            return client;
        }).then(function () {
            return fixtures.loadFile('test/fixtures.json', models, {
                log: function (msg) {}
            });
        }).then(function () {
            done();
        })
    });

    describe('Create', function () {
        
        it('creates and returns an user', function (done) {
            var fake = {
                email: 'someone@gmail.com',
                password: 'password'
            };

            client
                .post('/users')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(201);
                
                    var user = res.body.user;
                    expect(user.id).to.equal(1);
                    expect(user.email).to.equal('someone@gmail.com');
                    expect(user.isAuthenticated).to.be.true;
                    done();
                });
        });
    });

    describe('Authenticated', function () {
        
        it('authenticate the user and returns the token', function (done) {
            var fake = {
                email: 'iam@gustavohenrique.com',
                password: 'password123'
            };

            client
                .post('/users/authenticate')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                
                    var user = res.body.user;
                    expect(user.id).to.equal(10);
                    expect(user.email).to.equal('iam@gustavohenrique.com');
                    expect(res.body.token).to.have.length(161);
                    done();
                });
        });
    });

});