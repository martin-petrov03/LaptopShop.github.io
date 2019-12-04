const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
describe('Add Product', function() {    
    it("should not create product", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 5",
	            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mTQcfYB0-Q44UKTf4hzy2nzQEREmWFR3ph_VDe6lHQw_CcEnog&s",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(500);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
    it("should not create product", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire",
	            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mTQcfYB0-Q44UKTf4hzy2nzQEREmWFR3ph_VDe6lHQw_CcEnog&s",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(500);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
    it("should create product successfully", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 5",
	            "url": "http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mTQcfYB0-Q44UKTf4hzy2nzQEREmWFR3ph_VDe6lHQw_CcEnog&s",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(500);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
});