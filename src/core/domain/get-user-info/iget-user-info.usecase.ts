import { type GetUserInfoDtoResponse } from './get-user-info.dto';

export interface IGetUserInfoUseCase {
  /**
   * Obtém as informações do usuário a partir do ID do usuário.
   * @param {string} userId - ID do usuário.
   * @returns {Promise<GetUserInfoDtoResponse>} - Uma promessa que resolve para as informações do usuário.
   * @throws {GlobalError} - Lança um erro global se a obtenção das informações do usuário falhar.
   */
  getUserInfo: (userId: string) => Promise<GetUserInfoDtoResponse>;
}
