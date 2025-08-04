import { type GetUserInfoDtoResponse } from './get-user-info.dto';
import { type IGetUserInfoUseCase } from './iget-user-info.usecase';
import type IGetUserInfoRepository from './repository/iget-user-info.repository';
import GlobalError from '@/errors';

/**
 * Caso de uso responsável por obter informações de usuários.
 */
export class GetUserInfoUseCase implements IGetUserInfoUseCase {
  constructor(private readonly getUserInfoRepository: IGetUserInfoRepository) {}

  async getUserInfo(userId: string): Promise<GetUserInfoDtoResponse> {
    try {
      // Chama o método do repositório para obter as informações do usuário
      return await this.getUserInfoRepository.getUserInfo(userId);
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter as informações do usuário
      throw new GlobalError(
        'Erro ao obter as informações do usuário',
        500,
        error
      );
    }
  }
}
