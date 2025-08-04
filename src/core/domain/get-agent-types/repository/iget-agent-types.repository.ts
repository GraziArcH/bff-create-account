import { type AgentType } from '../get-agent-types.dto';

export default interface IGetAgentTypesRepository {
  /**
   * Obtém os tipos de agentes.
   * @returns {Promise<AgentType[]>} - Uma promessa que resolve para uma lista de tipos de agentes.
   * @throws {GlobalError} - Lança um erro global se a obtenção dos tipos de agentes falhar.
   */
  getAgentTypes: () => Promise<AgentType[]>;
}
