import { userFacade } from '@archoffice/domain-infraestructure';
import { type GetUserInfoDtoResponse } from '../get-user-info.dto';
import type IGetUserInfoRepository from './iget-user-info.repository';
import * as jwt from 'jsonwebtoken';
import GlobalError from '@/errors';

/**
 * Repositório responsável por obter informações de usuários.
 */
export default class GetUserInfoRepository implements IGetUserInfoRepository {
  async getUserId(userToken: string): Promise<string> {
    try {
      // Decodifica o token JWT para obter as informações do usuário
      const decodedToken = jwt.decode(userToken);

      // Verifica se o token foi decodificado corretamente e se possui a propriedade 'sub'
      if (
        !decodedToken ||
        typeof decodedToken !== 'object' ||
        !decodedToken.sub
      ) {
        throw new Error('Token inválido ou propriedade sub ausente');
      }

      // Converte a propriedade 'sub' do token para uma string contendo o ID do usuário
      const userId = String(decodedToken.sub);
      return userId;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter o ID do usuário a partir do token
      throw new GlobalError(
        'Erro ao buscar o ID de usuário a partir do Token de Usuário',
        400,
        error
      );
    }
  }

  async getUserInfo(userId: string): Promise<GetUserInfoDtoResponse> {
    try {
      // Obtém as informações do usuário a partir do ID do usuário
      const user = await userFacade.getUserByIDPUserId(userId);

      // Mapeia os dados do usuário para o formato GetUserInfoDtoResponse
      const userInfo: GetUserInfoDtoResponse = {
        name: user.name.value,
        surname: user.surname.value,
        idpUserId: user.idpUserId.value,
        userTypeId: user.userTypeId.value,
        admin: user.admin,
        companyId: user.companyId.value,
        active: user.active,
        createdAt: user.createdAt
      };

      return userInfo;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter as informações do usuário a partir do ID do usuário
      throw new GlobalError(
        'Erro ao buscar as informações do usuário a partir do ID de Usuário',
        500,
        error
      );
    }
  }
}
