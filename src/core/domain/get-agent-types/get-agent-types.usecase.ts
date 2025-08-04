import { type AgentType } from './get-agent-types.dto';
import { type IGetAgentTypesUseCase } from './iget-agent-types.usecase';
import type IGetAgentTypesRepository from './repository/iget-agent-types.repository';
import GlobalError from '@/errors';

/**
 * Caso de uso responsável por obter os tipos de agentes.
 */
export class GetAgentTypesUseCase implements IGetAgentTypesUseCase {
  constructor(
    private readonly getAgentTypeRepository: IGetAgentTypesRepository
  ) {}

  async getAgentTypes(): Promise<AgentType[]> {
    try {
      // Obtém a lista de tipos de agentes utilizando o repositório
      return await this.getAgentTypeRepository.getAgentTypes();
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os tipos de agentes
      throw new GlobalError('Erro ao obter tipos de agente', 500, error);
    }
  }
}
