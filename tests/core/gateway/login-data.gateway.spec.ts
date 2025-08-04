import axios from 'axios';
import GlobalError from '@/errors';
import { CreateAdminAccountDTO, CreateUserAccountDTO } from '@/core/domain/create-account-domain/dtos';
import { LoginDataGateway } from '@/core/gateway/login-data.gateway';
import { config } from '@/core/infrastructure/config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginDataGateway', () => {
  let loginDataGateway: LoginDataGateway;

  beforeEach(() => {
    loginDataGateway = new LoginDataGateway();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAdminAccount', () => {
    it('should create an admin account successfully', async () => {
      const createAdminAccountDTO: CreateAdminAccountDTO = {
        name: 'Admin',
        surname: 'User',
        userTypeId: 1,
        agentTypeId: 2,
        email: 'admin@example.com',
        password: 'password',
        companyName: 'Company',
        cnpj: '12345678000123',
        commercialName: 'Company Commercial',
        companyLink: 'http://example.com',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      };

      mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

      const result = await loginDataGateway.createAdminAccount(createAdminAccountDTO);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${config.MS_LOGIN_BASE_URL}/create-admin-account`,
        createAdminAccountDTO
      );
      expect(result).toBe(true);
    });

    it('should throw a GlobalError when creation fails', async () => {
      const createAdminAccountDTO: CreateAdminAccountDTO = {
        name: 'Admin',
        surname: 'User',
        userTypeId: 1,
        agentTypeId: 2,
        email: 'admin@example.com',
        password: 'password',
        companyName: 'Company',
        cnpj: '12345678000123',
        commercialName: 'Company Commercial',
        companyLink: 'http://example.com',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      };

      const error = new Error('Network Error');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(loginDataGateway.createAdminAccount(createAdminAccountDTO)).rejects.toThrow(GlobalError);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${config.MS_LOGIN_BASE_URL}/create-admin-account`,
        createAdminAccountDTO
      );
    });
  });

  describe('createUserAccount', () => {
    it('should create a user account successfully', async () => {
      const createUserAccountDTO: CreateUserAccountDTO = {
        hash: 'somehash',
        name: 'User',
        surname: 'User',
        userTypeId: 1,
        email: 'user@example.com',
        password: 'password',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      };

      mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

      const result = await loginDataGateway.createUserAccount(createUserAccountDTO);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${config.MS_LOGIN_BASE_URL}/create-user-account?hash=${createUserAccountDTO.hash}`,
        createUserAccountDTO
      );
      expect(result).toBe(true);
    });

    it('should throw a GlobalError when creation fails', async () => {
      const createUserAccountDTO: CreateUserAccountDTO = {
        hash: 'somehash',
        name: 'User',
        surname: 'User',
        userTypeId: 1,
        email: 'user@example.com',
        password: 'password',
        phones: [{ phone: '1234567890', type: 'mobile' }]
      };

      const error = new Error('Network Error');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(loginDataGateway.createUserAccount(createUserAccountDTO)).rejects.toThrow(GlobalError);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${config.MS_LOGIN_BASE_URL}/create-user-account?hash=${createUserAccountDTO.hash}`,
        createUserAccountDTO
      );
    });
  });
});
