import type IGetAgentTypesRepository from './iget-agent-types.repository';
import { type AgentType } from '../get-agent-types.dto';
import { companyFacade } from '@archoffice/domain-infraestructure';
import GlobalError from '@/errors';

/**
 * Repositório responsável por obter os tipos de agentes.
 */
export default class GetAgentTypesRepository
  implements IGetAgentTypesRepository
{
  async getAgentTypes(): Promise<AgentType[]> {
    try {
      // Chama o facade da empresa para obter os tipos de agentes
      const agentTypesEntities = await companyFacade.getAgentTypes();
      if (!agentTypesEntities) {
        throw new GlobalError('Erro ao buscar os tipos de agentes', 500);
      }
      // Mapeia as entidades para o tipo de agente esperado
      const agentTypes: AgentType[] = agentTypesEntities.map((entity) => ({
        id: entity.agentTypeId.value,
        name: entity.agentType.value
      }));

      return agentTypes;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os tipos de agentes
      throw new GlobalError('Erro ao obter tipos de agente', 500, error);
    }
  }
}
