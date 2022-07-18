import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

const mockedMatches = [{
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "São Paulo"
  },
  teamAway: {
    teamName: "Grêmio"
  }
},
{
  id: 2,
  homeTeam: 9,
  homeTeamGoals: 1,
  awayTeam: 14,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: "Internacional"
  },
  teamAway: {
    teamName: "Santos"
  }
}
]

describe('O método get na rota /matches', () => {

  before(() => {
    sinon.stub(Matches, 'findAll').resolves(mockedMatches as any)
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  });

  it('retorna um array de matches com o status 200', async () => {
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(mockedMatches);
  });
});

describe('O método patch na rota /matches/:id/end', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Matches, "findByPk").resolves({
          id: 13,
          homeTeam: 2,
          awayTeam: 9,
          homeTeamGoals: 3,
          awayTeamGoals: 3,
          inProgress: 1,
        } as unknown as Matches);

    sinon.stub(Matches, "update").resolves();
  });

  after(()=>{
    (Matches.findByPk as sinon.SinonStub).restore();
    (Matches.update as sinon.SinonStub).restore();
  })

  it('retorna o status 200 em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/3/finish')

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('retorna um objeto que tem uma propriedade chamada mensagem', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matches/3/finish')

    expect(chaiHttpResponse.body).to.have.property('message', 'Finished');
  });
});