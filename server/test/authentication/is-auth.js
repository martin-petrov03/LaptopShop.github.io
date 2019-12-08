const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
describe('isAuth', function() {
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

    it("should return not authenticated", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')            
            .send({
                "productName": "Acer Aspire 5",                
                "quantity": 5.5,
                "author": "5de7d291e1b87223ec044e73"
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(401);
                expect(res.body.message).to.be.deep.equal('Not authenticated!');
                done();
            });
    });   
    it("should return invalid data", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')
            .set('token', '1234')
            .send({
                "productName": "Acer Aspire 5",                
                "quantity": 5.5,
                "author": "5de7d291e1b87223ec044e73"
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(401);
                expect(res.body.message).to.be.deep.equal('Token is invalid!');
                done();
            });
    });
    it("should return invalid data", function(done) {        
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')
            .set('token', token)
            .send({
                "productName": "Acer Aspire 5",          
                "quantity": 5.5,
                "author": "5de7d291e1b87223ec044e73"
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Invalid Data!');
                done();
            });
    });
});