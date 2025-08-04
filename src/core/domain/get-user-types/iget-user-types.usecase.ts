import { type UserType } from './get-user-types.dto';

export interface IGetUserTypesUseCase {
  /**
   * Obtém os tipos de usuários.
   * @returns {Promise<UserType[]>} - Uma promessa que resolve para uma lista de tipos de usuários.
   * @throws {GlobalError} - Lança um erro global se a obtenção dos tipos de usuários falhar.
   */
  getUserTypes: () => Promise<UserType[]>;
}
