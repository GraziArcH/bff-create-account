import * as dotenv from 'dotenv';
import cors from 'cors';
import express, {
  type Request,
  type Response,
  json,
  type NextFunction
} from 'express';
import { UserAccountController } from './service/user-account.controller';
import GetUserTypesRepository from './core/domain/get-user-types/repository/get-user-types.repository';
import GetUserTypesUseCase from './core/domain/get-user-types/get-user-types.usecase';
import { GetAgentTypesUseCase } from './core/domain/get-agent-types/get-agent-types.usecase';
import GetUserInfoRepository from './core/domain/get-user-info/repository/get-user-info.repository';
import { GetUserInfoUseCase } from './core/domain/get-user-info/get-user-info.usecase';
import { UserMiddleware } from './middlewares/user.middleware';
import GetAgentTypesRepository from './core/domain/get-agent-types/repository/get-agent-types.repository';
import { CreateUserAccountDomain } from './core/domain/create-account-domain/domain';
import { config, validateEnvVars } from './core/infrastructure/config';
import errorHandler from './middlewares';
require('express-async-errors');

dotenv.config();

validateEnvVars();

const port = config.BFF_CREATE_ACCOUNT_PORT;
const frontendUrl = config.FRONTEND_URL;
const app = express();

// Definição do cors
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.disable('x-powered-by');
app.use(json());
app.use(cors(corsOptions));

const getUserInfoRepository = new GetUserInfoRepository();
const getUserInfoUseCase = new GetUserInfoUseCase(getUserInfoRepository);
const getUserTypesRepository = new GetUserTypesRepository();
const getUserTypesUseCase = new GetUserTypesUseCase(getUserTypesRepository);
const getAgentTypesRepository = new GetAgentTypesRepository();
const getAgentTypesUseCase = new GetAgentTypesUseCase(getAgentTypesRepository);
const accountDomain = new CreateUserAccountDomain();
const userAccountController = new UserAccountController(
  accountDomain,
  getUserTypesUseCase,
  getAgentTypesUseCase,
  getUserInfoUseCase
);
const userMiddleware = new UserMiddleware(getUserInfoRepository);

/**
 * Rota para criação de conta de administrador.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 */
app.post('/create-admin-account', async (req: Request, res: Response) => {
  return await userAccountController.createAdminAccount(req, res);
});

/**
 * Rota para criação de conta de usuário.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 */
app.post('/create-user-account', async (req: Request, res: Response) => {
  return await userAccountController.createUserAccount(req, res);
});

/**
 * Rota para obter informações do usuário.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 * @param {NextFunction} next - Próxima função de middleware.
 */
app.get(
  '/get-user-info',
  async (req: Request, res: Response, next: NextFunction) =>
    await userMiddleware.getUserId(req, res, next),
  async (req: Request, res: Response) => {
    return await userAccountController.getUserInfo(req, res);
  }
);

/**
 * Rota para obter tipos de agentes.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 */
app.get('/get-agent-types', async (req: Request, res: Response) => {
  return await userAccountController.getAgentTypes(res);
});

/**
 * Rota para obter tipos de usuários.
 * @param {Request} req - Objeto de solicitação.
 * @param {Response} res - Objeto de resposta.
 */
app.get('/get-user-types', async (req: Request, res: Response) => {
  return await userAccountController.getUserTypes(res);
});

// Middleware para tratamento de erros assíncronos
app.use(errorHandler);

/**
 * Inicializa o servidor na porta especificada.
 */
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
