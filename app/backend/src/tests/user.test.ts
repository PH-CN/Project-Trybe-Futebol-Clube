import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { roleResponse } from '../database/protocols';
import User from '../database/models/UserModel';

const mockedUser = {
  id: 1,
  username: 'joesley',
  role: 'user',
  email: 'joesley@email.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const mockedDecodedUser = {
  id: 1,
  username: 'joesley',
  role: 'user',
  email: 'joesley@email.com',
  iat: 1657478952
}

chai.use(chaiHttp);

const { expect } = chai;

describe('O método post na rota login', () => {
  before(() => {
    sinon.stub(User, 'findOne')
      .resolves(mockedUser as User)
    sinon.stub(jwt, 'sign').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc')
  });

  after(() => {
    (User.findOne as sinon.SinonStub)
      .restore();
    (jwt.sign as sinon.SinonStub).restore();
  })

  it('feito corretamente retorna o status 200 com um token', async () => {
    const response = await chai.request(app).post('/login').send({ email: mockedUser.email, password: 'secret_user' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc' });
  });

  it('feito sem um email retorna o status 400 e a mensagem de que todos os campos devem estar preenchidos', async () => {
    const response = await chai.request(app).post('/login').send({ password: 'secret_user' });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.eql({ message: 'All fields must be filled' });
  });
});

describe('O método validateAuth na rota /login/validate', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves(mockedDecodedUser)
  })

  after(() => {
    (jwt.verify as sinon.SinonStub).restore()
  })

  it('retorna o status 200 quando o request é feito corretamente', async () => { 
    const response = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTc0Nzg5NTJ9.CZiJqRdLrJVsfgEg6r5KUA0Aq85eEVwCQzZ-3c_VnT4');
    expect(response.status).to.be.equal(200);
  })
})