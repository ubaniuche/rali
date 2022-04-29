process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../../index')
const { CREATED, OK, BAD_REQUEST, NOT_FOUND } = require('../../constants/StatusCodes')

const should = chai.should()
const expect = chai.expect
const prefix = '/api/v1'

chai.use(chaiHttp)

describe('Loading', () => {
    let droneId = 1
    let load = {
        "medication_id": 1,
        "quantity": 5
    }
    let droneLoad, loadItemId = 1

    /*
    * Test the /GET load route
    */
    describe('/get load', () => {
        it('it should GET a drone\'s load', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/${droneId}`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone load found')
                        expect(res.body.metaData.id).to.be.equal(droneId)
                        expect(res.body.metaData.weight).to.be.equal(0)
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST load', () => {
        it('it should POST a load', (done) => {
            
            chai.request(server)
                .post(`${prefix}/loading/drones/${droneId}`)
                .send(load)
                .end((err, res) => {
                        res.should.have.status(CREATED);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Item added successfully')
                        expect(res.body.metaData.weight).to.be.greaterThan(0)
                        expect(res.body.metaData.drone_id).to.be.equal(droneId)
                        droneLoad = res.body.metaData
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST load', () => {
        it('it should POST a load', (done) => {
            
            chai.request(server)
                .post(`${prefix}/loading/drones/${droneId}`)
                .send(load)
                .end((err, res) => {
                        res.should.have.status(CREATED);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Item added successfully')
                        expect(res.body.metaData.weight).to.be.greaterThan(0)
                        expect(res.body.metaData.drone_id).to.be.equal(droneId)
                        droneLoad = res.body.metaData
                    done();
                });
        });
    });

    /*
    * Test the /POST route
    */
    describe('/POST load', () => {
        it('it should POST a load with wrong data to test validators', (done) => {
            
            chai.request(server)
                .post(`${prefix}/loading/drones/${droneId}`)
                .send({})
                .end((err, res) => {
                        res.should.have.status(BAD_REQUEST);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.have.property('metaData');
                        expect(res.body.message).to.be.equal('Bad Request')
                        expect(res.body.metaData.body.medication_id).to.be.equal("medication_id must be at least 1 and an integer")
                        expect(res.body.metaData.body.quantity).to.be.equal("quantity must be at least 1 and an integer")
                    done();
                });
        });
    });

    /*
    * Test the /GET load route
    */
    describe('/get load', () => {
        it('it should GET a drone\'s load', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/${droneId}`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone load found')
                        expect(res.body.metaData.id).to.be.equal(droneId)
                        expect(res.body.metaData.weight).to.be.equal(droneLoad.weight)
                    done();
                });
        });
    });

    /*
    * Test the /GET load route
    */
    describe('/get load', () => {
        it('it should GET a load with wrong id', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/100`)
                .end((err, res) => {
                        res.should.have.status(NOT_FOUND);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone load not found')
                    done();
                });
        });
    });

    /*
    * Test the /GET load route
    */
    describe('/get load', () => {
        it('it should GET a load with wrong id datatype', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/a`)
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
    * Test the /GET load items route
    */
    describe('/get load items', () => {
        it('it should GET a drone\'s load items', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/${droneId}/items`)
                .end((err, res) => {
                    console.log(res)
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone load items found')
                        expect(res.body.metaData.count).to.be.greaterThan(0)
                        expect(res.body.metaData.rows[0].drone_id).to.be.equal(droneId)
                    done();
                });
        });
    });

    /*
    * Test the /GET load items route
    */
    describe('/get load item', () => {
        it('it should GET a drone\'s load item', (done) => {
            
            chai.request(server)
                .get(`${prefix}/loading/drones/${droneId}/items/${loadItemId}`)
                .end((err, res) => {
                    console.log(res)
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone load item found')
                        expect(res.body.metaData.drone_id).to.be.equal(droneId)
                    done();
                });
        });
    });

    /*
    * Test the /Delete load item route
    */
    describe('/delete load item', () => {
        it('it should DELETE(offload) a drone\'s load item', (done) => {
            
            chai.request(server)
                .delete(`${prefix}/loading/drones/${droneId}/items/${loadItemId}`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Item offloaded successfully')
                        expect(res.body.metaData.drone_id).to.be.equal(droneId)
                    done();
                });
        });
    });

    /*
    * Test the /Delete load items route
    */
    describe('/delete load item', () => {
        it('it should DELETE(offload) a drone\'s load items', (done) => {
            
            chai.request(server)
                .delete(`${prefix}/loading/drones/${droneId}/items`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.should.be.a('object')
                        expect(res.body.message).to.be.equal('Items offloaded successfully')
                        expect(res.body.metaData.drone_id).to.be.equal(droneId)
                    done();
                });
        });
    });

});