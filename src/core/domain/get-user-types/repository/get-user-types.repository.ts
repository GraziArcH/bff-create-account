import { userFacade } from '@archoffice/domain-infraestructure';
import { type IGetUserTypesRepository } from './iget-user-types.repository';
import { type UserType } from '../get-user-types.dto';
import GlobalError from '@/errors';

/**
 * Repositório responsável por obter os tipos de usuários.
 */
export default class GetUserTypesRepository implements IGetUserTypesRepository {
  async getUserTypes(): Promise<UserType[]> {
    try {
      // Obtém os tipos de usuários
      const userTypesEntities = await userFacade.getUserTypes();

      // Mapeia as entidades de tipos de usuários para o formato UserType
      const userTypes: UserType[] = userTypesEntities.map((entity) => ({
        id: entity.userTypeId.value,
        name: entity.userType.value
      }));

      return userTypes;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os tipos de usuários
      throw new GlobalError('Erro ao obter tipos de usuários', 500, error);
    }
  }
}
