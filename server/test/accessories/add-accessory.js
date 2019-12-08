const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();

let token;
let userId;
describe('Add Accessory', function() {
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
    
    it("should return already exist", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/accessories/add')
            .set('token', token)
            .set('userId', userId)
            .send({ 
                "title": "mouse",
	            "url": "https://gaming-mouse.png",
	            "description": "Very expensive gaming mouse",
	            "price": 799.99
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(409);
                expect(res.body.message).to.be.deep.equal('A product already exist!');
                done();
            });
    });
    it("should return already exist", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/accessories/add')
            .set('token', token)
            .set('userId', userId)
            .send({ 
                "title": "gaming mouse",
	            "url": "https://mouse.png",
	            "description": "Very expensive gaming mouse",
	            "price": 799.99
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(409);
                expect(res.body.message).to.be.deep.equal('A product already exist!');
                done();
            });
    });
    it("should return price is invalid", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/accessories/add')
            .set('token', token)
            .set('userId', userId)
            .send({ 
                "title": "gaming mouse",
	            "url": "https://gaming-mouse.png",
	            "description": "Very cheap gaming mouse",
	            "price": 0.001
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Price is invalid!');
                done();
            });
    });
    it("should return invalid data", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/accessories/add')
            .set('token', token)
            .set('userId', userId)
            .send({ 
                "title": "gaming mouse",
	            "url": "https://gaming-mouse.png",
	            "description": "Mouse",
	            "price": 799.99
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Invalid data!');
                done();
            });
    });
    it("should return invalid data", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/accessories/add')
            .set('token', token)
            .set('userId', userId)
            .send({ 
                "title": "gaming mouse",
	            "url": "gaming-mouse.png",
	            "description": "Very expensive gaming mouse",
	            "price": 799.99
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Invalid data!');
                done();
            });
    });    
});