'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, startServer, closeServer} = require('../server');
const expect = chai.expect;


chai.use(chaiHttp);

describe("functional tests", function() {
before(function() {
    return startServer();
  });
after(function() {
    return closeServer();
  });


//get endpoint
describe('GET endpoint', function() {
    it('Server should return 200 code', function() {

      return chai.request(app)
        .get('/').then(function(_res) {
        expect(_res).to.have.status(200);
        })
    });
  });
});