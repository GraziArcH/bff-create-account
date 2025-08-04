import { type Request, type Response, type NextFunction } from 'express';
import type IGetUserInfoRepository from '@/core/domain/get-user-info/repository/iget-user-info.repository';
import GlobalError from '@/errors';

/**
 * Middleware responsável por obter o ID do usuário a partir do token de autenticação.
 */
export class UserMiddleware {
  constructor(private readonly getUserInfoRepository: IGetUserInfoRepository) {}

  /**
   * Middleware para obter o ID do usuário a partir do token de autenticação.
   * @param {Request} req - Objeto de solicitação.
   * @param {Response} res - Objeto de resposta.
   * @param {NextFunction} next - Próxima função de middleware.
   * @returns {Promise<void | Response>} - Retorna a próxima função de middleware ou uma resposta de erro.
   */
  async getUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    try {
      const { userToken } = req.body; // Extrai o token de usuário do corpo da solicitação

      // Chama o repositório para obter o ID do usuário a partir do token
      const userId = await this.getUserInfoRepository.getUserId(
        userToken as string
      );
      // Verifica se o ID do usuário foi encontrado
      if (!userId) {
        throw new GlobalError('Usuário não autorizado', 401);
      }

      // Armazena o ID do usuário na solicitação para uso posterior
      req.userId = userId;

      next(); // Chama a próxima função de middleware
    } catch (error) {
      throw new GlobalError(
        'Erro no processo de buscar o ID do usuário',
        500,
        error
      );
    }
  }
}
