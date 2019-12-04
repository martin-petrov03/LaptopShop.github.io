const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);
chai.should();
 
describe('Add Product', function() {    
    it("should return already exist", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 5",
	            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfL6rmBoQvcwVaFDqYO7l774jj42NnLsmRXYZaG46Zbbp4Gpjsgw&s",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
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
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire",
	            "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfL6rmBoQvcwVaFDqYO7l774jj42NnLsmRXYZaG46Zbbp4Gpjsgw&s",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(409);
                expect(res.body.message).to.be.deep.equal('A product already exist!');
                done();
            });
    });
    it("should return cannot be created", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer",
	            "url": "https://laptop.png",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
    it("should return cannot be created", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 3",
	            "url": "hhttps://laptop.png",
	            "description": "Acer Aspire 5aAcer Aspire 5aAcer Aspire 5a",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
    it("should return cannot be created", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 1",
	            "url": "hhttps://laptop.png",
	            "description": "Acer",
	            "price": 1000.01           
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Product cannot be created!');
                done();
            });
    });
    it("should return invalid price", function(done) {
        this.timeout(100000);
        chai.request(app)
            .post('/laptops/add')
            .send({ 
                "model": "Acer Aspire 1",
	            "url": "hhttps://laptop.png",
	            "description": "Acer Aspire 1Acer Aspire 1Acer Aspire 1",
	            "price": 0.001
            })
            .end((err, res) => {   
                expect(err).to.be.null;
                res.should.have.status(400);
                expect(res.body.message).to.be.deep.equal('Price is invalid!');
                done();
            });
    });
});