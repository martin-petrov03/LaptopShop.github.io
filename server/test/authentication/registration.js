const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
describe('SignUp', function() {    
    it("should not signUp", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signup')
            .send({ 
                email: 'john@gmail.com',
                username: "John000",
                password: 'john'           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(422);
                expect(res.body.message).to.be.deep.equal('Invalid Data!');
                done();
            });
    });
    it("should not signUp", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signup')
            .send({ 
                email: 'john@g',
                username: "John000",
                password: 'john1'           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(422);
                expect(res.body.message).to.be.deep.equal('Invalid Data!');
                done();
            });
    });
    it("should not signUp", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/auth/signup')
            .send({ 
                email: 'martin.petrov033@gmail.com',
                username: "Pesho",
                password: '123123'
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(409);
                expect(res.body.message).to.be.deep.equal('E-Mail address already exists!');
                done();
            });
    });
    // it("should not signUp", function(done) {
    //     this.timeout(100000);
    //     chai.request(app)
    //         .post('/auth/signup')
    //         .send({ 
    //             email: 'john@gmail.com',
    //             username: "John123",
    //             password: '12345'
    //         })
    //         .end((err, res) => {   
    //             expect(err).to.be.null;
    //             res.should.have.status(201);
    //             expect(res.body.message).to.be.deep.equal('User created!');
    //             done();
    //         });
    // });
});