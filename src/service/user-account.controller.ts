import { type ICreateUserAccountDomain } from '@/core/domain/create-account-domain/interface';
import { type IGetAgentTypesUseCase } from '@/core/domain/get-agent-types/iget-agent-types.usecase';
import { type IGetUserInfoUseCase } from '@/core/domain/get-user-info/iget-user-info.usecase';
import { type IGetUserTypesUseCase } from '@/core/domain/get-user-types/iget-user-types.usecase';
import { type Request, type Response } from 'express';
import Joi from 'joi';
import { ArchFramework } from 'versatus-arch-framework/arch-framework';

const logInstance = ArchFramework.getLogInstance();

/**
 * Esquemas de validação para as requisições.
 */
const createAdminAccountSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  userTypeId: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  companyName: Joi.string().required(),
  agentTypeId: Joi.number().required(),
  cnpj: Joi.string().required(),
  phones: Joi.array()
    .items(
      Joi.object({
        phone: Joi.string().required(),
        type: Joi.string().required()
      })
    )
    .required(),
  commercialName: Joi.string().required(),
  companyLink: Joi.string().uri().required()
});

const createUserAccountSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  userTypeId: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phones: Joi.array()
    .items(
      Joi.object({
        phone: Joi.string().required(),
        type: Joi.string().required()
      })
    )
    .required(),
  hash: Joi.string().required()
});

/**
 * Controlador para gerenciar contas de usuário.
 */
export class UserAccountController {
  constructor(
    private readonly createUserDomain: ICreateUserAccountDomain,
    private readonly getUserTypesUseCase: IGetUserTypesUseCase,
    private readonly getAgentTypesUseCase: IGetAgentTypesUseCase,
    private readonly getUserInfoUseCase: IGetUserInfoUseCase
  ) {}

  /**
   * Cria uma conta de administrador.
   *
   * Este método recebe uma requisição para criar uma conta de administrador. Ele extrai os dados necessários do corpo da requisição,
   * valida os dados usando Joi, chama o domínio responsável por criar a conta de administrador e retorna uma resposta com o status da operação.
   *
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} - Resposta com status e mensagem.
   */
  async createAdminAccount(req: Request, res: Response): Promise<Response> {
    // Validação do corpo da requisição
    const { error } = createAdminAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos na requisição',
        error
      });
    }

    try {
      // Extraindo dados do corpo da requisição
      const {
        name,
        surname,
        userTypeId,
        email,
        password,
        companyName,
        agentTypeId,
        cnpj,
        phones,
        commercialName,
        companyLink
      } = req.body;

      // Chamando o domínio para criar a conta de administrador
      await this.createUserDomain.createAdminAccount({
        name,
        surname,
        userTypeId,
        email,
        password,
        companyName,
        agentTypeId,
        cnpj,
        commercialName,
        companyLink,
        phones
      });

      // Retornando resposta de sucesso
      return res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso'
      });
    } catch (error) {
      // Tratamento de erro e logs
      logInstance.setError(
        error,
        'Erro no processo de criar uma conta de administrador'
      );

      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro no processo de criar uma conta de administrador',
        error
      });
    }
  }

  /**
   * Cria uma conta de usuário.
   *
   * Este método recebe uma requisição para criar uma conta de usuário. Ele extrai os dados necessários do corpo da requisição,
   * valida os dados usando Joi, chama o domínio responsável por criar a conta de usuário e retorna uma resposta com o status da operação.
   *
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} - Resposta com status e mensagem.
   */
  async createUserAccount(req: Request, res: Response): Promise<Response> {
    // Validação do corpo da requisição
    const { error } = createUserAccountSchema.validate({
      ...req.body,
      hash: req.query.hash
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos na requisição',
        error
      });
    }

    try {
      // Extraindo dados do corpo da requisição
      const { name, surname, phones, userTypeId, email, password } = req.body;
      // Extraindo hash da query string
      const { hash } = req.query;

      // Chamando o domínio para criar a conta de usuário
      await this.createUserDomain.createUserAccount({
        name,
        surname,
        phones,
        userTypeId,
        email,
        password,
        hash: String(hash)
      });

      // Retornando resposta de sucesso
      return res.status(201).json({
        success: true,
        message: 'Usuário cadastrado com sucesso'
      });
    } catch (error) {
      // Tratamento de erro e logs
      logInstance.setError(
        error,
        'Erro no processo de criar uma conta de usuário'
      );

      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro no processo de criar uma conta de usuário',
        error
      });
    }
  }

  /**
   * Obtém os tipos de usuários.
   *
   * Este método chama o caso de uso para obter os tipos de usuários e retorna uma resposta com os dados.
   *
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} - Resposta com status e tipos de usuários.
   */
  async getUserTypes(res: Response): Promise<Response> {
    try {
      // Chamando o caso de uso para obter os tipos de usuários
      const response = await this.getUserTypesUseCase.getUserTypes();

      // Retornando resposta de sucesso com os dados
      return res.status(200).json({
        success: true,
        data: { userTypes: response }
      });
    } catch (error) {
      // Tratamento de erro e logs
      logInstance.setError(
        error,
        'Erro no processo de buscar os tipos de usuários'
      );

      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro no processo de buscar os tipos de usuários',
        error
      });
    }
  }

  /**
   * Obtém os tipos de agentes.
   *
   * Este método chama o caso de uso para obter os tipos de agentes e retorna uma resposta com os dados.
   *
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} - Resposta com status e tipos de agentes.
   */
  async getAgentTypes(res: Response): Promise<Response> {
    try {
      // Chamando o caso de uso para obter os tipos de agentes
      const response = await this.getAgentTypesUseCase.getAgentTypes();

      // Retornando resposta de sucesso com os dados
      return res.status(200).json({
        success: true,
        data: { agentTypes: response }
      });
    } catch (error) {
      // Tratamento de erro e logs
      logInstance.setError(
        error,
        'Erro no processo de buscar os tipos de agentes'
      );

      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro no processo de buscar os tipos de agentes',
        error
      });
    }
  }

  /**
   * Obtém as informações de um usuário.
   *
   * Este método chama o caso de uso para obter as informações de um usuário específico e retorna uma resposta com os dados.
   *
   * @param {Request} req - Objeto de requisição do Express.
   * @param {Response} res - Objeto de resposta do Express.
   * @returns {Promise<Response>} - Resposta com status e informações do usuário.
   */
  async getUserInfo(req: Request, res: Response): Promise<Response> {
    try {
      // Obtendo o ID do usuário a partir da requisição
      const userId = req.userId;

      // Chamando o caso de uso para obter as informações do usuário
      const response = await this.getUserInfoUseCase.getUserInfo(userId);

      // Retornando resposta de sucesso com os dados do usuário
      return res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      // Tratamento de erro e logs
      logInstance.setError(
        error,
        'Erro no processo de buscar as informações do usuário'
      );

      console.error(error);
      return res.status(500).json({
        success: false,
        message: 'Erro no processo de buscar as informações do usuário',
        error
      });
    }
  }
}
