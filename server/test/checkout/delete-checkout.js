const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();

let token;
let userId;
 
describe('Delete Checkout', function() {
    beforeEach(function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signin')
            .send({
                email: 'martin.petrov033@gmail.com',
                password: '12345'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res.body.message).to.be.deep.equal('User successfully logged in!');
                token = res.body.token;
                userId = res.body.userId;
                done();
            });
    });
    it("should return all checkouts", function(done) {
        this.timeout(100000);
        chai.request(app)
            .delete('/checkouts/complete/1234')
            .set('token', token)
            .set('userId', userId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Cannot find the checkout!');             
                done();
            });
    });
    // S
});