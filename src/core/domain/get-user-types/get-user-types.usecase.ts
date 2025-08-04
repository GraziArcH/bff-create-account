import { type UserType } from './get-user-types.dto';
import { type IGetUserTypesUseCase } from './iget-user-types.usecase';
import { type IGetUserTypesRepository } from './repository/iget-user-types.repository';
import GlobalError from '@/errors';

/**
 * Caso de uso responsável por obter os tipos de usuários.
 */
export default class GetUserTypesUseCase implements IGetUserTypesUseCase {
  constructor(
    private readonly getUserTypesRepository: IGetUserTypesRepository
  ) {}

  async getUserTypes(): Promise<UserType[]> {
    try {
      // Chama o método do repositório para obter os tipos de usuários
      return await this.getUserTypesRepository.getUserTypes();
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os tipos de usuários
      throw new GlobalError('Erro ao obter tipos de usuários', 500, error);
    }
  }
}
