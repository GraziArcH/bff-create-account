import { GetAgentTypesUseCase } from "@/core/domain/get-agent-types/get-agent-types.usecase";
import IGetAgentTypesRepository from "@/core/domain/get-agent-types/repository/iget-agent-types.repository";


describe('GetAgentTypesUseCase', () => {
  let useCase: GetAgentTypesUseCase;
  let mockRepository: jest.Mocked<IGetAgentTypesRepository>;

  beforeEach(() => {
    mockRepository = {
      getAgentTypes: jest.fn(),
    } as jest.Mocked<IGetAgentTypesRepository>;

    useCase = new GetAgentTypesUseCase(mockRepository);
  });

  it('should fetch agent types from repository', async () => {
    const mockAgentTypes = [{ id: 1, name: 'Agent 1' }, { id: 2, name: 'Agent 2' }];
    mockRepository.getAgentTypes.mockResolvedValueOnce(mockAgentTypes);

    const result = await useCase.getAgentTypes();

    expect(result).toEqual(mockAgentTypes);
    expect(mockRepository.getAgentTypes).toHaveBeenCalled();
  });

  it('should handle repository error', async () => {
    const errorMessage = 'Erro ao obter tipos de agente';
    mockRepository.getAgentTypes.mockRejectedValueOnce(new Error(errorMessage));

    await expect(useCase.getAgentTypes()).rejects.toThrow(errorMessage);
  });
});
