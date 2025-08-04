import GetUserTypesRepository from '@/core/domain/get-user-types/repository/get-user-types.repository';
import { userFacade } from '@archoffice/domain-infraestructure';

jest.mock('@archoffice/domain-infraestructure', () => ({
  userFacade: {
    getUserTypes: jest.fn()
  }
}));

describe('GetUserTypesRepository', () => {
  let repository: GetUserTypesRepository;

  beforeEach(() => {
    repository = new GetUserTypesRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user types', async () => {
    const userTypesMock = [
      { userTypeId: { value: 1 }, userType: { value: 'Admin' } },
      { userTypeId: { value: 2 }, userType: { value: 'Regular' } }
    ];

    (userFacade.getUserTypes as jest.Mock).mockResolvedValue(userTypesMock);

    const result = await repository.getUserTypes();

    expect(result).toEqual([
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Regular' }
    ]);
  });

  it('should throw an error if userFacade getUserTypes fails', async () => {
    const error = new Error('Some error occurred');

    (userFacade.getUserTypes as jest.Mock).mockRejectedValue(error);

    await expect(repository.getUserTypes()).rejects.toThrow('Erro ao obter tipos de usuários');
  });
});