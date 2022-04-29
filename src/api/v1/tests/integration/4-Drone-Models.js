process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../../../index')
const { OK } = require('../../constants/StatusCodes')

const should = chai.should()
const expect = chai.expect
const prefix = '/api/v1'

chai.use(chaiHttp)

describe('Drone Models', () => {

    /*
    * Test the /GET route
    */
    describe('/get drone', () => {
        it('it should GET all drone models', (done) => {
            
            chai.request(server)
                .get(`${prefix}/drone-models`)
                .end((err, res) => {
                        res.should.have.status(OK);
                        res.body.should.be.a('object');
                        res.body.metaData.rows.should.be.a('array')
                        res.body.metaData.rows[0].should.be.a('object')
                        expect(res.body.message).to.be.equal('Drone models found')
                        expect(res.body.metaData.count).to.be.greaterThan(0)
                    done();
                });
        });
    });

});