import GetUserInfoRepository from '@/core/domain/get-user-info/repository/get-user-info.repository';
import { userFacade } from '@archoffice/domain-infraestructure';
import jwt from 'jsonwebtoken';

jest.mock('@archoffice/domain-infraestructure', () => ({
  userFacade: {
    getUserByIDPUserId: jest.fn(),
  },
}));

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('GetUserInfoRepository', () => {
  describe('getUserId', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return user ID when a valid user token is provided', async () => {
      const repository = new GetUserInfoRepository();
      const fakeToken = 'fake.token.123';

      (jwt.decode as jest.Mock).mockReturnValueOnce({ sub: 'fakeUserId' });

      const userId = await repository.getUserId(fakeToken);

      expect(userId).toEqual('fakeUserId');
      expect(jwt.decode).toHaveBeenCalledWith(fakeToken);
    });

    it('should throw an error when an invalid user token is provided', async () => {
      const repository = new GetUserInfoRepository();
      const fakeToken = 'invalid.token.123';
      const errorMessage = 'Erro ao buscar o ID de usuário a partir do Token de Usuário';

      (jwt.decode as jest.Mock).mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      await expect(repository.getUserId(fakeToken)).rejects.toThrow(
        'Erro ao buscar o ID de usuário a partir do Token de Usuário'
      );
      expect(jwt.decode).toHaveBeenCalledWith(fakeToken);
    });
  });

  describe('getUserInfo', () => {
    it('should return user info when valid userId is provided', async () => {
      const repository = new GetUserInfoRepository();
      const userId = '123';

      const mockUser = {
        name: { value: 'John' },
        surname: { value: 'Doe' },
        idpUserId: { value: userId },
        userTypeId: { value: 1 },
        admin: false,
        companyId: { value: 456 },
        active: true,
        createdAt: new Date(),
      };

      (userFacade.getUserByIDPUserId as jest.Mock).mockResolvedValue(mockUser);

      const result = await repository.getUserInfo(userId);
      expect(result).toEqual({
        name: 'John',
        surname: 'Doe',
        idpUserId: userId,
        userTypeId: 1,
        admin: false,
        companyId: 456,
        active: true,
        createdAt: mockUser.createdAt,
      });
    });

    it('should throw error when invalid userId is provided', async () => {
      const repository = new GetUserInfoRepository();

      (userFacade.getUserByIDPUserId as jest.Mock).mockRejectedValue(new Error('User not found'));

      await expect(repository.getUserInfo('invalidId')).rejects.toThrow(
        'Erro ao buscar as informações do usuário a partir do ID de Usuário'
      );
    });
  });
});
