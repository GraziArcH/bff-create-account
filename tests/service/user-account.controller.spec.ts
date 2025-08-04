import { Request, Response } from 'express';
import { ICreateUserAccountDomain } from '@/core/domain/create-account-domain/interface';
import { IGetUserTypesUseCase } from '@/core/domain/get-user-types/iget-user-types.usecase';
import { IGetAgentTypesUseCase } from '@/core/domain/get-agent-types/iget-agent-types.usecase';
import { IGetUserInfoUseCase } from '@/core/domain/get-user-info/iget-user-info.usecase';
import { UserAccountController } from '@/service/user-account.controller';

const mockCreateUserDomain: ICreateUserAccountDomain = {
  createAdminAccount: jest.fn(),
  createUserAccount: jest.fn(),
};

const mockGetUserTypesUseCase: IGetUserTypesUseCase = {
  getUserTypes: jest.fn(),
};

const mockGetAgentTypesUseCase: IGetAgentTypesUseCase = {
  getAgentTypes: jest.fn(),
};

const mockGetUserInfoUseCase: IGetUserInfoUseCase = {
  getUserInfo: jest.fn(),
};

const createMockRequest = (body: any = {}, query: any = {}, headers: any = {}): Request => ({
  body,
  query,
  headers,
}) as unknown as Request;

const createMockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserAccountController', () => {
  let controller: UserAccountController;

  beforeEach(() => {
    controller = new UserAccountController(
      mockCreateUserDomain,
      mockGetUserTypesUseCase,
      mockGetAgentTypesUseCase,
      mockGetUserInfoUseCase
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAdminAccount', () => {
    it('should create an admin account and return 201 status', async () => {
      const req = createMockRequest({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        companyName: 'Company',
        agentTypeId: 2,
        cnpj: '12345678000123',
        phones: [{ phone: '1234567890', type: 'mobile' }],
        commercialName: 'Company Commercial',
        companyLink: 'http://example.com'
      });
      const res = createMockResponse();

      (mockCreateUserDomain.createAdminAccount as jest.Mock).mockResolvedValue(true);

      await controller.createAdminAccount(req, res);

      expect(mockCreateUserDomain.createAdminAccount).toHaveBeenCalledWith({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        companyName: 'Company',
        agentTypeId: 2,
        cnpj: '12345678000123',
        phones: [{ phone: '1234567890', type: 'mobile' }],
        commercialName: 'Company Commercial',
        companyLink: 'http://example.com'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Usuário cadastrado com sucesso'
      });
    });

    it('should handle validation errors', async () => {
      const req = createMockRequest({});
      const res = createMockResponse();

      await controller.createAdminAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Dados inválidos na requisição',
        error: expect.any(Object)
      });
    });

    it('should handle domain errors', async () => {
      const req = createMockRequest({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        companyName: 'Company',
        agentTypeId: 2,
        cnpj: '12345678000123',
        phones: [{ phone: '1234567890', type: 'mobile' }],
        commercialName: 'Company Commercial',
        companyLink: 'http://example.com'
      });
      const res = createMockResponse();

      const error = new Error('Domain error');
      (mockCreateUserDomain.createAdminAccount as jest.Mock).mockRejectedValue(error);

      await controller.createAdminAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro no processo de criar uma conta de administrador',
        error
      });
    });
  });

  describe('createUserAccount', () => {
    it('should create a user account and return 201 status', async () => {
      const req = createMockRequest({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      }, {
        hash: 'validhash'
      });
      const res = createMockResponse();

      (mockCreateUserDomain.createUserAccount as jest.Mock).mockResolvedValue(true);

      await controller.createUserAccount(req, res);

      expect(mockCreateUserDomain.createUserAccount).toHaveBeenCalledWith({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        phones: [{ phone: '1234567890', type: 'mobile' }],
        hash: 'validhash'
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Usuário cadastrado com sucesso'
      });
    });

    it('should handle validation errors', async () => {
      const req = createMockRequest({});
      const res = createMockResponse();

      await controller.createUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Dados inválidos na requisição',
        error: expect.any(Object)
      });
    });

    it('should handle domain errors', async () => {
      const req = createMockRequest({
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      }, {
        hash: 'validhash'
      });
      const res = createMockResponse();

      const error = new Error('Domain error');
      (mockCreateUserDomain.createUserAccount as jest.Mock).mockRejectedValue(error);

      await controller.createUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro no processo de criar uma conta de usuário',
        error
      });
    });
  });

  describe('getUserTypes', () => {
    it('should get user types and return 200 status', async () => {
      const res = createMockResponse();
      const userTypes = [{ id: 1, name: 'Admin' }];

      (mockGetUserTypesUseCase.getUserTypes as jest.Mock).mockResolvedValue(userTypes);

      await controller.getUserTypes(res);

      expect(mockGetUserTypesUseCase.getUserTypes).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { userTypes }
      });
    });

    it('should handle domain errors', async () => {
      const res = createMockResponse();
      const error = new Error('Domain error');

      (mockGetUserTypesUseCase.getUserTypes as jest.Mock).mockRejectedValue(error);

      await controller.getUserTypes(res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro no processo de buscar os tipos de usuários',
        error
      });
    });
  });

  describe('getAgentTypes', () => {
    it('should get agent types and return 200 status', async () => {
      const res = createMockResponse();
      const agentTypes = [{ id: 1, name: 'Agent' }];

      (mockGetAgentTypesUseCase.getAgentTypes as jest.Mock).mockResolvedValue(agentTypes);

      await controller.getAgentTypes(res);

      expect(mockGetAgentTypesUseCase.getAgentTypes).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { agentTypes }
      });
    });

    it('should handle domain errors', async () => {
      const res = createMockResponse();
      const error = new Error('Domain error');

      (mockGetAgentTypesUseCase.getAgentTypes as jest.Mock).mockRejectedValue(error);

      await controller.getAgentTypes(res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro no processo de buscar os tipos de agentes',
        error
      });
    });
  });

 describe('getUserInfo', () => {
    it('should get user info and return 200 status', async () => {
      const req = createMockRequest({}, {}, { authorization: 'Bearer token' });
      const res = createMockResponse();
      req.userId = '123';
      const userInfo = {
        name: 'John',
        surname: 'Doe',
        idpUserId: '123',
        userTypeId: 1,
        admin: true,
        companyId: 1,
        active: true
      };

      (mockGetUserInfoUseCase.getUserInfo as jest.Mock).mockResolvedValue(userInfo);

      await controller.getUserInfo(req, res);

      expect(mockGetUserInfoUseCase.getUserInfo).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: userInfo
      });
    });

    it('should handle domain errors', async () => {
      const req = createMockRequest({}, {}, { authorization: 'Bearer token' });
      const res = createMockResponse();
      req.userId = '123';
      const error = new Error('Domain error');

      (mockGetUserInfoUseCase.getUserInfo as jest.Mock).mockRejectedValue(error);

      await controller.getUserInfo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro no processo de buscar as informações do usuário',
        error
      });
    });
  });
});
