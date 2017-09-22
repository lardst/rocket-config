var mocha = require("mocha"),
    should = require("should"),
    rocket = require("../")('./test/config/');

describe("Rocket config method tests.", function () {
    it("The 'config' data should be an object.", function (done) {
        rocket.config.should.be.an.Object
        done();
    });

    it("The 'config' data should have a property 'Rebels'.", function (done) {
        rocket.config.should.have.property('Rebels');
        done();
    });

    it("The 'config' data should have a property 'Rebels.Solo[1].name' with a value of 'Han'.", function (done) {
        rocket.config.Rebels.Solo[1].should.have.property('name', 'Han');
        done();
    });

    it("The 'config' data should have a property 'Rebels' that is an object.", function (done) {
        rocket.config.Rebels.should.be.an.Object
        done();
    });

    it("Using the 'stage' environment there should be a 'Rougues' property.", function (done) {
        rocket = require("../")('./test/config/', {env: 'stage'})
        rocket.config.should.have.property('Rougues');
        done();
    });

    it("Using the 'foo' config with 'debian' OS there should be a 'fighters' property.", function (done) {
        rocket = require("../")('./test/config/foo', {os: 'debian'})
        rocket.foo.should.have.property('fighters');
        done();
    });
});
