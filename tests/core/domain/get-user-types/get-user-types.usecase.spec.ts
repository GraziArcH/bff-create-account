import GetUserTypesUseCase from "@/core/domain/get-user-types/get-user-types.usecase";
import { IGetUserTypesRepository } from "@/core/domain/get-user-types/repository/iget-user-types.repository";

const mockRepository: jest.Mocked<IGetUserTypesRepository> = {
  getUserTypes: jest.fn(),
};

const sampleUserTypes = [{ id: 1, name: 'UserType1' }, { id: 2, name: 'UserType2' }];

describe('GetUserTypesUseCase', () => {
  let getUserTypesUseCase: GetUserTypesUseCase;

  beforeEach(() => {
    getUserTypesUseCase = new GetUserTypesUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch user types correctly', async () => {
    mockRepository.getUserTypes.mockResolvedValueOnce(sampleUserTypes);

    const result = await getUserTypesUseCase.getUserTypes();

    expect(mockRepository.getUserTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(sampleUserTypes);
  });

  it('should handle repository errors', async () => {
    const errorMessage = 'Erro ao obter tipos de usuários';
    mockRepository.getUserTypes.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getUserTypesUseCase.getUserTypes()).rejects.toThrow(errorMessage);
  });
});
