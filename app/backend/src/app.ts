import * as express from 'express';
import errorHandler from './database/middlewares/ErrorHandler';
import TeamController from './database/controllers/teamController';
import UserController from './database/controllers/userController';
import TeamRepository from './database/repositories/teamRepository';
import UserRepository from './database/repositories/userRepository';
import TeamService from './database/services/teamService';
import UserService from './database/services/userService';
import MatchRepository from './database/repositories/matchRepository';
import MatchService from './database/services/matchService';
import MatchController from './database/controllers/matchController';
import LeaderboardService from './database/services/leaderboardService';
import LeaderboardController from './database/controllers/leaderboardController';

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

  return controller;
};

const MatchFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service)

  return controller
}

const LeaderboardFactory = () => {
  const service = new LeaderboardService();
  const controller = new LeaderboardController(service);

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
    });

    this.app.get('/teams/:id', (req, res, next) => {
      TeamFactory().findByPk(req, res, next);
    });

    this.app.get('/matches', (req, res, next) => {
      MatchFactory().findAll(req, res, next);
    });

    this.app.post('/matches', (req, res, next) => {
      MatchFactory().create(req, res, next);
    })

    this.app.patch('/matches/:id/finish', (req, res, next) => {
      MatchFactory().endMatch(req, res, next);
    })

    this.app.patch('/matches/:id', (req, res, next) => {
      MatchFactory().update(req, res, next);
    })

    this.app.get('/leaderboard/home', (req, res, next) => {
      LeaderboardFactory().leaderboardHome(req, res, next)
    })

    this.app.use(errorHandler);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
