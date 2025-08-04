import { LoginDataGateway } from '@/core/gateway/login-data.gateway';
import { type ICreateUserAccountDomain } from './interface';
import { type CreateAdminAccountDTO, type CreateUserAccountDTO } from './dtos';
import GlobalError from '@/errors';

/**
 * Classe responsável pela criação de contas de usuário e administrador.
 */
export class CreateUserAccountDomain implements ICreateUserAccountDomain {
  private readonly loginDataGateway: LoginDataGateway;

  constructor() {
    // Instancia do gateway
    this.loginDataGateway = new LoginDataGateway();
  }

  async createAdminAccount(dto: CreateAdminAccountDTO): Promise<boolean> {
    try {
      // Cria uma conta de administrador utilizando o gateway
      return await this.loginDataGateway.createAdminAccount(dto);
    } catch (error) {
      throw new GlobalError(
        'Não foi possível criar uma conta de administrador',
        500,
        error
      );
    }
  }

  async createUserAccount(dto: CreateUserAccountDTO): Promise<boolean> {
    try {
      // Cria uma conta de usuário utilizando o gateway
      return await this.loginDataGateway.createUserAccount(dto);
    } catch (error) {
      throw new GlobalError(
        'Não foi possível criar a conta de usuário',
        500,
        error
      );
    }
  }
}
