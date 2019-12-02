const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
describe('SignIn', function() {    
    it("should not signIn", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signin')
            .send({ 
                email: 'john@gmail.com',
                password: 'john'                
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(401);
                expect(res.body.message).to.be.deep.equal('A user with this email could not be found!');
                done();
            });
    });
    it("should signIn correctly", function(done) {
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
                done();
            });
    });
    it("should not singIn", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signin')
            .send({ 
                email: 'martin.petrov033@gmail.com',
                password: '1'                
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(401);
                expect(res.body.message).to.be.deep.equal('Invalid password!');
                done();
            });
    });
});