import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/index'

chai.use(chaiHttp)

describe('Api Endpoint test', () => {
  it('Get Data mail', (done) => {
    chai
      .request(app)
      .get('/api/v1/askme')
      .end((err, res) => {
        if (err) done(err)
        expect(res).to.be.not.equal(null)
        done()
      })
  })
})
