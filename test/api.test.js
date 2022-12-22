const chai = require('chai')
const chaiHttp = require('chai-http')
const { it, describe } = require('mocha')
const app = require('../src/app')

chai.use(chaiHttp)

describe('Testing de API', () => {
    it('Deberia retornar ok al hacer get a la raiz', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.status(200))
                chai.assert.equal(res.body.message, 'Ok')
                done()
            })
    })
})