var mocha = require("mocha"),
    should = require("should"),
    rocket = require("../")('./test/config/');

describe("Rocket config method tests.", function () {
    it("The 'config' data should be an object.", function (done) {
        rocket.config.should.be.Object
        done();
    });

    it("The 'config' data should have a property 'groot' with a value of 'We are Groot'.", function (done) {
        rocket.config.should.have.property('groot', 'We are Groot');
        done();
    });

    it("The 'global' data should have a property 'doctor' with a value of 'who'.", function (done) {
        rocket.global.should.have.property('doctor', 'who');
        done();
    });

    it("The 'global' data should have a property 'ddalek.exterminate.exterminate.exterminate' that is a boolean.", function (done) {
        rocket.global.dalek.exterminate.exterminate.exterminate.should.be.Boolean;
        done();
    });

    it("Using the 'stage' environment there should be a 'gamora' property.", function (done) {
        rocket = require("../")('./test/config/', {env: 'stage'})
        rocket.config.should.have.property('gamora');
        done();
    });

    it("Using the 'foo' config with 'debian' OS there should be a 'fighters' property.", function (done) {
        rocket = require("../")('./test/config/foo', {os: 'debian'})
        rocket.foo.should.have.property('fighters');
        done();
    });
});
