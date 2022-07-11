import * as express from 'express';
import TeamController from './database/controllers/teamController';
import UserController from './database/controllers/userController';
import TeamRepository from './database/repositories/teamRepository';
import UserRepository from './database/repositories/userRepository';
import TeamService from './database/services/teamService';
import UserService from './database/services/userService';

const UserFactory = () => {
  const repository = new UserRepository();
  const service = new UserService(repository);
  const controller = new UserController(service);

  return controller;
};

const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller
}

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.post('/login', (req, res, next) => {
      UserFactory().login(req, res, next);
    });

    this.app.get('/login/validate', (req, res, next) => {
      UserFactory().validateAuth(req, res, next);
    });

    this.app.get('/teams', (req, res, next) => {
      TeamFactory().findAll(req, res, next);
    })
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
