const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
let token;

describe('Delete accessory', function() {
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
            .delete(`/accessories/delete/1234`)
            .set('token', token)
            .set('userId', userId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Cannot find the product!');
                done();
            });
    });
    it("should return cannot find product", function(done) {
        const productId = '5de91e69db08113a34925d00';
        this.timeout(100000);
        chai.request(app)
            .delete(`/accessories/delete/${productId}`)
            .set('token', token)
            .set('userId', userId)
            .end((err, res) => {
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Cannot find the product!');
                done();
            });
    });
    // it("should return cannot find product", function(done) {
    //     const productId = '5ded12135636fc4224e37685';
    //     this.timeout(100000);
    //     chai.request(app)
    //         .delete(`/accessories/delete/${productId}`)
    //         .set('token', token)
    //         .set('userId', userId)
    //         .end((err, res) => {
    //             expect(err).to.be.null;
    //             res.should.have.status(200);
    //             expect(res.body.message).to.be.deep.equal('Product has been successfully deleted!');
    //             done();
    //         });
    // });   
});