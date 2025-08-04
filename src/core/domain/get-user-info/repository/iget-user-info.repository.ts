import { type GetUserInfoDtoResponse } from '../get-user-info.dto';

export default interface IGetUserInfoRepository {
  /**
   * Obtém as informações do usuário a partir do ID do usuário.
   * @param {string} userId - ID do usuário.
   * @returns {Promise<GetUserInfoDtoResponse>} - Uma promessa que resolve para as informações do usuário.
   * @throws {GlobalError} - Lança um erro global se a obtenção das informações do usuário falhar.
   */
  getUserInfo: (userId: string) => Promise<GetUserInfoDtoResponse>;
  /**
   * Obtém o ID do usuário a partir do token de autenticação.
   * @param {string} userToken - Token de autenticação do usuário.
   * @returns {Promise<string>} - Uma promessa que resolve para o ID do usuário.
   * @throws {GlobalError} - Lança um erro global se a decodificação do token falhar.
   */
  getUserId: (userToken: string) => Promise<string>;
}
