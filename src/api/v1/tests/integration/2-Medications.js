process.env.NODE_ENV = 'test'

const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../../index')
const { CREATED, OK, BAD_REQUEST, NOT_FOUND } = require('../../constants/StatusCodes')

const should = chai.should()
const expect = chai.expect
const prefix = '/api/v1'

chai.use(chaiHttp)


describe('Medications', () => {
    
    let medication = { 
        "name": "panadol",
        "code": "A2A_M22",
        "weight": 10,
    }

    /*
    * Test the /POST route
    */
    describe('/POST medication', () => {
        it('it should POST a medication with wrong image type', (done) => {
            
            chai.request(server)
                .post(`${prefix}/medications`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', medication.name)
                .field('code', medication.code)
                .field('weight', medication.weight)
                .attach('image', fs.readFileSync(__dirname + '/../image/medication.gif'), 'medication.gif')
                .end((err, res) => {
                        res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('image must be of either jpeg or png format')
                    done();
                });
        });
    });


    /*
    * Test the /POST route
    */
    describe('/POST medication', () => {
        it('it should POST a medication with correct data', (done) => {
            
            chai.request(server)
                .post(`${prefix}/medications`)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('name', medication.name)
                .field('code', medication.code)
                .field('weight', medication.weight)
                .attach('image', fs.readFileSync(__dirname + '/../image/medication.jpeg'), 'medication.jpeg')
                .end((err, res) => {
                        res.should.have.status(CREATED);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Medication added successfully')
                        expect(res.body.metaData.name).to.be.equal(medication.name)
                        expect(res.body.metaData.code).to.be.equal(medication.code)
                        medication = res.body.metaData
                    done();
                });
        });
    });
    
    /*
    * Test the /POST route
    */
    describe('/POST medication', () => {
        it('it should POST a medication with wrong data to test validators', (done) => {

            chai.request(server)
                .post(`${prefix}/medications`)
                .send({"code": "am=23"})
                .end((err, res) => {
                        res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.body.name).to.be.equal("name must be a string")
                        expect(res.body.metaData.body.code).to.be.equal("code can only contain capital letters, numbers and \"_\"")
                        expect(res.body.metaData.body.weight).to.be.equal("weight must be at least 1 and an integer")
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST medication', () => {
        it('it should POST a medication with duplicate data to test validators', (done) => {
            
            const {id, image_url, ...rest} = medication

            chai.request(server)
                .post(`${prefix}/medications`)
                .send(rest)
                .end((err, res) => {
                        res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.body.name).to.be.equal("Medication with name exist")
                        expect(res.body.metaData.body.code).to.be.equal("Medication with code exist")
                    done();
                });
        });
    });

    /*
    * Test the /GET route
    */
    describe('/get medications', () => {
        it('it should GET all medications', (done) => {
            
            chai.request(server)
                .get(`${prefix}/medications`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.rows.should.be.a('array')
                        res.body.metaData.rows[0].should.be.a('object')
                        expect(res.body.message).to.be.equal('Medications found')
                        expect(res.body.metaData.count).to.be.greaterThan(0)
                        expect(res.body.metaData.rows[0].name).to.be.equal(medication.name)
                    done();
                });
        });
    });

    /*
    * Test the /GET medication route
    */
    describe('/get medication', () => {
        it('it should GET a medication', (done) => {
            
            chai.request(server)
                .get(`${prefix}/medications/${medication.id}`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Medication found')
                        expect(res.body.metaData.id).to.be.equal(medication.id)
                        expect(res.body.metaData.name).to.be.equal(medication.name)
                        expect(res.body.metaData.image_url.length).to.be.greaterThan(0)
                    done();
                });
        });
    });

    /*
    * Test the /GET medication route
    */
    describe('/get medication', () => {
        it('it should GET a medication with wrong id', (done) => {

            chai.request(server)
                .get(`${prefix}/medications/100`)
                .end((err, res) => {
                        res.should.have.status(NOT_FOUND);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Medication not found')
                    done();
                });
        });
    });

    /*
    * Test the /GET medication route
    */
    describe('/get medication', () => {
        it('it should GET a medication with wrong id datatype', (done) => {
            
            chai.request(server)
                .get(`${prefix}/medications/a`)
                .end((err, res) => {
                    res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.params.medication_id).to.be.equal('medication_id must be at least 1 and an integer')
                    done();
                });
        });
    });

});