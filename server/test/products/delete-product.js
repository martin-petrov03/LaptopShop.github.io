const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
let token;

describe('Delete Product', function() {
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

    it("should return cannot find product", function(done) {        
        this.timeout(100000);
        chai.request(app)
            .delete(`/laptops/delete/1234`)
            .set('token', token)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
                expect(res.body.message).to.be.deep.equal('Cannot delete the product!');
                done();
            });
    });
    it("should return cannot find product", function(done) {
        const productId = '5de91e69db08113a34925d00';
        this.timeout(100000);
        chai.request(app)
            .delete(`/laptops/delete/${productId}`)
            .set('token', token)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(500);
                expect(res.body.message).to.be.deep.equal('Cannot delete the product!');
                done();
            });
    });
});