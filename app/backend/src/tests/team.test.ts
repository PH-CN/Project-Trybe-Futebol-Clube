import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/TeamModel';

const mockedTeam = {
  id: 1,
  team_name: 'TSM'
}

chai.use(chaiHttp);

const { expect } = chai;

describe('O método get na rota /teams:/id', () => {

  before(() => {
    sinon.stub(Teams, 'findByPk').resolves(mockedTeam as Teams)
  })

  after(() => {
    (Teams.findByPk as sinon.SinonStub).restore()
  })

  it('Retorna um time corretamente com o status 200 quando um id válido é passado', async () => {
    const response = await chai.request(app).get('/teams/1')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(mockedTeam)
  })
})