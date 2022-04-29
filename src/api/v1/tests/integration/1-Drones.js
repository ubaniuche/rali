process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../../index')
const { CREATED, OK, BAD_REQUEST, NOT_FOUND } = require('../../constants/StatusCodes')

const should = chai.should()
const expect = chai.expect
const prefix = '/api/v1'

chai.use(chaiHttp)

describe('Drones', () => {
    let droneId
    let drone = { serial_number: "A1ERE34AS", model_id: 1 }

    let droneUpdate = {"battery_level": 90, "status": "loading", "model_id": 1}

    /*
    * Test the /POST route
    */
    describe('/POST drone', () => {
        it('it should POST a drone', (done) => {
            
            chai.request(server)
                .post(`${prefix}/drones`)
                .send(drone)
                .end((err, res) => {
                        res.should.have.status(CREATED);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Drone added successfully')
                        expect(res.body.metaData.serial_number).to.be.equal(drone.serial_number)
                        expect(res.body.metaData.model_id).to.be.equal(drone.model_id)
                        droneId = res.body.metaData.id
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST drone', () => {
        it('it should POST a drone with wrong data to test validators', (done) => {
            
            chai.request(server)
                .post(`${prefix}/drones`)
                .send({})
                .end((err, res) => {
                        res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.body.serial_number).to.be.equal("serial_number must be a string")
                        expect(res.body.metaData.body.model_id).to.be.equal("model_id must be at least 1 and an integer")
                    done();
                });
        });
    });

    /*
    * Test the /GET route
    */
    describe('/get drones', () => {
        it('it should GET drones', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.rows.should.be.a('array')
                        res.body.metaData.rows[0].should.be.a('object')
                        expect(res.body.message).to.be.equal('Drones found')
                        expect(res.body.metaData.count).to.be.greaterThan(0)
                        expect(res.body.metaData.rows[0].serial_number).to.be.equal(drone.serial_number)
                    done();
                });
        });
    });

    /*
    * Test the /GET drone route
    */
    describe('/get drone', () => {
        it('it should GET a drone', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones/${droneId}`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone found')
                        expect(res.body.metaData.id).to.be.equal(droneId)
                        expect(res.body.metaData.serial_number).to.be.equal(drone.serial_number)
                    done();
                });
        });
    });


    /*
    * Test the /GET drone route
    */
    describe('/get drone', () => {
        it('it should GET a drone with wrong id', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones/100`)
                .end((err, res) => {
                        res.should.have.status(NOT_FOUND);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone not found')
                    done();
                });
        });
    });

    /*
    * Test the /GET drone route
    */
    describe('/get drone', () => {
        it('it should GET a drone with wrong id datatype', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones/a`)
                .end((err, res) => {
                    res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.params.drone_id).to.be.equal('drone_id must be at least 1 and an integer')
                    done();
                });
        });
    });

    /*
    * Test the /PATCH drone route
    */
    describe('/patch drone', () => {
        it('it should UPDATE a drone', (done) => {
            
            chai.request(server)
                .patch(`${prefix}/drones/${droneId}`)
                .send(droneUpdate)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone updated successfully')
                        expect(res.body.metaData.id).to.be.equal(droneId)
                        expect(res.body.metaData.serial_number).to.be.equal(drone.serial_number)
                    done();
                });
        });
    });

    /*
    * Test the /GET drone route
    */
    describe('/get drone battery audit', () => {
        it('it should GET a drone\'s battery audit', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones/${droneId}/battery-audits`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('array')
                        expect(res.body.message).to.be.equal('Battery audit/history not found for drone')
                        expect(res.body.metaData.length).to.be.equal(0)
                    done();
                });
        });
    });

    /*
    * Test the /GET available route
    */
    describe('/get available drones', () => {
        it('it should GET available drones', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drones/available`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.rows.should.be.a('array')
                        res.body.metaData.rows[0].should.be.a('object')
                        expect(res.body.message).to.be.equal('Available drones found')
                        expect(res.body.metaData.count).to.be.greaterThan(0)
                        expect(res.body.metaData.rows[0].serial_number).to.be.equal(drone.serial_number)
                    done();
                });
        });
    });

});