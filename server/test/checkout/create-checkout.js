const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();

let token;
 
describe('Create Checkout', function() {
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
                done();
            });
    });
    
    it("should return invalid data", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')
            .set('token', token)
            .set('userId', userId)
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
    // it("should checkout correctly", function(done) {
    //     this.timeout(100000);
    //     chai.request(app)
    //         .post('/checkouts/add')
    //         .set('token', token)
    //         .set('userId', userId)
    //         .send({
    //             "productName": "Acer Aspire 5",
    //             "quantity": 5,
    //             "author": "5de7d291e1b87223ec044e73"
    //         })
    //         .end((err, res) => {   
    //             expect(err).to.be.null;
    //             res.should.have.status(200);
    //             expect(res.body.message).to.be.deep.equal('Checkout has been successfully created!');
    //             done();
    //         });
    // });
    it("should return invalid product", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')
            .set('token', token)
            .set('userId', userId)
            .send({
                "productName": "Acer Aspire",                
                "quantity": 5,
                "author": "5de7d291e1b87223ec044e73"
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Invalid Product!');
                done();
            });
    });
    it("should return invalid product", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/checkouts/add')
            .set('token', token)
            .set('userId', userId)
            .send({
                "productName": "Acer Aspire",                
                "quantity": 0,
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