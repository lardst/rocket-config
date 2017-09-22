var mocha = require("mocha"),
		should = require("should"),
		rocket = require("../")('./test/config/');

describe("Rocket config Method Tests.", function () {
    it("The 'config' data should be an object.", function (done) {
        rocket.config.should.be.Object
        done();
    });

    it("The 'config' data should have a property 'groot' with a value of 'We are Groot'.", function (done) {
        rocket.config.should.have.property('groot', 'We are Groot');
        done();
    });
});
