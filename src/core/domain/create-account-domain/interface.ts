import { type CreateAdminAccountDTO, type CreateUserAccountDTO } from './dtos';

export interface ICreateUserAccountDomain {
  /**
   * Cria uma conta de administrador.
   * @param {CreateAdminAccountDTO} dto - Dados para a criação da conta de administrador.
   * @returns {Promise<boolean>} - Retorna true se a conta for criada com sucesso.
   * @throws {GlobalError} - Lança um erro global se a criação da conta falhar.
   */
  createAdminAccount: (dto: CreateAdminAccountDTO) => Promise<boolean>;
  /**
   * Cria uma conta de usuário.
   * @param {CreateUserAccountDTO} dto - Dados para a criação da conta de usuário.
   * @returns {Promise<boolean>} - Retorna true se a conta for criada com sucesso.
   * @throws {GlobalError} - Lança um erro global se a criação da conta falhar.
   */
  createUserAccount: (dto: CreateUserAccountDTO) => Promise<boolean>;
}
