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

    describe('Find', function () {
        
        it('returns all public sites if no filter is specified', function (done) {
            client.get('/sites').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(8);
                
                var site = res.body.sites[0];
                expect(Object.keys(site)).to.have.length(12);
                expect(site.id).to.equal(1);
                expect(site.title).to.equal('22 Essential CSS Recipes');
                expect(site.longUrl).to.equal('http://ipestov.com/22-essential-css-recipes/');
                expect(site.code).to.equal('r733t');
                expect(site.tags[0]).to.equal('developer');
                expect(site.tags[1]).to.equal('design');
                expect(site.tags[2]).to.equal('css');
                done();
            });
        });

        it('returns only the value of the specified field', function (done) {
            client.get('/sites?fields=code').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(8);

                var site = res.body.sites[0];
                expect(Object.keys(site)).to.have.length(1);
                done();
            });
        });

        it('should paginates the result', function (done) {
            client.get('/sites?page=2&perPage=2').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(2);

                var site = res.body.sites[0];
                expect(site.code).to.equal('qhh62');
                done();
            });
        });

        it('should ignore the pagination if page or perPage are not numbers', function (done) {
            client.get('/sites?page=a&perPage=b').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(8);
                done();
            });
        });

        it('should sort the result by field in desc order', function (done) {
            client.get('/sites?sort=-id').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(8);

                var site = res.body.sites[0];
                expect(site.code).to.equal('flvqm');
                done();
            });
        });

        it('returns error if the sort field does not exists', function (done) {
            client.get('/sites?sort=-field10').end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
        });

        it('returns all sites that contains the tag', function (done) {
            client.get('/sites?tag=developer').end(function (err, res) {
                expect(res.status).to.equal(200);
                expect(res.body.sites).to.have.length(5);
                var site = res.body.sites[0];
                expect(site.tags[0]).to.equal('developer');
                done();
            });
        });

    });

    describe('Create', function () {

        it('creates and returns a valid site', function (done) {
            var fake = { longUrl: 'http://google.com' };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(201);
                    var site = res.body.site;
                    expect(site.code).to.have.length(5);
                    expect(site.userId).to.equal(null);
                    done();
                });
        });

        it('does not create and returns the site with the same longUrl', function (done) {
            var fake = { longUrl: 'http://ipestov.com/22-essential-css-recipes/' };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    var site = res.body.site;
                    expect(site.code).to.equal('r733t');
                    done();
                });
        });

        it('should fail if the url is invalid', function (done) {
            var fake = { longUrl: 'xxxxx' };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .expect(400)
                .end(done);
        });

        it('creates and returns a valid site with an user', function (done) {
            var fake = { longUrl: 'http://uniqueurl.com', userId: 10 };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(201);
                    var site = res.body.site;
                    expect(site.code).to.have.length(5);
                    expect(site.userId).to.equal(10);
                    done();
                });
        });

        it('should not creates site when user does not exists', function (done) {
            var fake = { longUrl: 'http://uniqueurl.com', userId: 9999 };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .expect(400, done);
        });

        it('should creates site when user has an invalid id', function (done) {
            var fake = { longUrl: 'http://uniqueurl.com', userId: 'aaaa' };
            client
                .post('/sites')
                .set('Accept', 'application/json')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(201);
                    expect(res.body.site.userId).to.equal(null);
                    done();
                });
        });
        
    });

    describe('Update', function () {

        it('updates site and returns it', function (done) {
            var fake = {
                id: 1,
                title: '22 Essential CSS Recipes',
                hits: 20,
                likes: 2,
                tags: ['tag1', 'tag2']
            };
            client
                .put('/sites/1')
                .set('Accept', 'application/json')
                .set('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsImVtYWlsIjoiaWFtQGd1c3Rhdm9oZW5yaXF1ZS5jb20iLCJpYXQiOjE0NTU0NzI4Nzh9.bE7Kih1VrMkWTV615GffsCT4ZkGSSZ1MheXK4BwtmBA')
                .send(fake)
                .end(function (err, res) {
                    expect(res.status).to.equal(200);
                    var site = res.body.site;
                    expect(site.id).to.equal(fake.id);
                    expect(site.title).to.equal(fake.title);
                    expect(site.hits).to.equal(fake.hits);
                    expect(site.tags).to.have.length(2);
                    expect(site.tags[0]).to.equal(fake.tags[0]);
                    done();
                });
        });

        it('should not updates site when user is not authenticated', function (done) {
            var fake = {
                id: 1,
                title: '22 Essential CSS Recipes',
                hits: 20,
                likes: 2,
                tags: ['tag1', 'tag2']
            };
            client
                .put('/sites/1')
                .set('Accept', 'application/json')
                .send(fake)
                .expect(403, done);
        });
        
    });

    describe('Destroy', function () {
        
        it('deletes and returns a site by id', function (done) {
            client.delete('/sites/1').end(function (err, res) {
                expect(res.status).to.equal(200);
                var site = res.body.site;
                expect(Object.keys(site)).to.have.length(12);
                expect(site.id).to.equal(1);
                expect(site.title).to.equal('22 Essential CSS Recipes');
                expect(site.longUrl).to.equal('http://ipestov.com/22-essential-css-recipes/');
                expect(site.code).to.equal('r733t');
                expect(site.tags[0]).to.equal('developer');
                expect(site.tags[1]).to.equal('design');
                expect(site.tags[2]).to.equal('css');
                done();
            });
        });

        it('should not delete a not found site', function (done) {
            client.delete('/sites/99999').end(function (err, res) {
                expect(res.status).to.equal(400);
                done();
            });
        });
    });

    describe('Redirect', function () {
        
        it('should redirect to default url', function (done) {
            client.get('/').expect(301, done);
        });

        it('should increase hits and redirect to the longUrl', function (done) {
            client.get('/r733t').end(function (err, res) {
                expect(res.status).to.equal(301);
                app.models.Site.findById(1).then(function (site) {
                    expect(site.hits).to.equal(2);
                    done();
                });
            });
        });

    });

});