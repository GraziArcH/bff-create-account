import axios from 'axios';
import {
  type CreateAdminAccountDTO,
  type CreateUserAccountDTO
} from '../domain/create-account-domain/dtos';
import GlobalError from '@/errors';
import { config } from '../infrastructure/config';

/**
 * Gateway de dados responsável por criar contas de usuários e administradores.
 */
export class LoginDataGateway {
  private readonly msLoginBaseUrl: string = config.MS_LOGIN_BASE_URL;

  /**
   * Cria uma conta de administrador.
   * @param {CreateAdminAccountDTO} createAdminAccount - Dados para a criação da conta de administrador.
   * @returns {Promise<boolean>} - Uma promessa que resolve para um valor booleano indicando sucesso.
   * @throws {GlobalError} - Lança um erro global se a criação da conta falhar.
   */
  async createAdminAccount(
    createAdminAccount: CreateAdminAccountDTO
  ): Promise<boolean> {
    try {
      // Envia uma requisição POST para criar a conta de administrador
      const response = await axios.post(
        `${this.msLoginBaseUrl}/create-admin-account`,
        createAdminAccount
      );
      return response.data.success;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao criar a conta de administrador
      throw new GlobalError('Erro ao criar conta de administrador', 500, error);
    }
  }

  /**
   * Cria uma conta de usuário.
   * @param {CreateUserAccountDTO} createUserAccount - Dados para a criação da conta de usuário.
   * @returns {Promise<boolean>} - Uma promessa que resolve para um valor booleano indicando sucesso.
   * @throws {GlobalError} - Lança um erro global se a criação da conta falhar.
   */
  async createUserAccount(
    createUserAccount: CreateUserAccountDTO
  ): Promise<boolean> {
    try {
      // Envia uma requisição POST para criar a conta de usuário
      const response = await axios.post(
        `${this.msLoginBaseUrl}/create-user-account?hash=${createUserAccount.hash}`,
        createUserAccount
      );
      return response.data.success;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao criar a conta de usuário
      throw new GlobalError('Erro ao criar conta de usuário', 500, error);
    }
  }
}
