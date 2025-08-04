import GetUserTypesRepository from '@/core/domain/get-user-types/repository/get-user-types.repository';
import { userFacade } from '@archoffice/domain-infraestructure';

jest.mock('@archoffice/domain-infraestructure', () => ({
  userFacade: {
    getUserTypes: jest.fn()
  }
}));

describe('GetUserTypesRepository', () => {
  let getUserTypesRepository: GetUserTypesRepository;

  beforeEach(() => {
    getUserTypesRepository = new GetUserTypesRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user types', async () => {
    const mockUserTypes = [
      { userTypeId: { value: 1 }, userType: { value: 'Admin' } },
      { userTypeId: { value: 2 }, userType: { value: 'Regular' } }
    ];

    (userFacade.getUserTypes as jest.Mock).mockResolvedValue(mockUserTypes);

    const result = await getUserTypesRepository.getUserTypes();

    expect(result).toEqual([
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Regular' }
    ]);

    expect(userFacade.getUserTypes).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when getUserTypes fails', async () => {
    const errorMessage = 'Failed to get user types';
    (userFacade.getUserTypes as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getUserTypesRepository.getUserTypes()).rejects.toThrow('Erro ao obter tipos de usuários');

    expect(userFacade.getUserTypes).toHaveBeenCalledTimes(1);
  });
});
