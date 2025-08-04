import { CreateUserAccountDomain } from "@/core/domain/create-account-domain/domain";
import { CreateAdminAccountDTO, CreateUserAccountDTO } from "@/core/domain/create-account-domain/dtos";
import GlobalError from "@/errors";

describe('CreateUserAccountDomain', () => {
  let createUserAccountDomain: CreateUserAccountDomain;

  beforeEach(() => {
    createUserAccountDomain = new CreateUserAccountDomain();
  });

  describe('createAdminAccount', () => {
    it('should create admin account successfully', async () => {
      const dto: CreateAdminAccountDTO = {
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        agentTypeId: 2,
        email: 'john.doe@example.com',
        password: 'password123',
        companyName: 'Example Company',
        cnpj: '12345678901234',
        commercialName: 'Example',
        companyLink: 'example.com',
        phones: [{ phone: '123456789', type: 'mobile' }]
      };

      const mockCreateAdminAccount = jest.fn().mockResolvedValue(true);
      createUserAccountDomain['loginDataGateway'].createAdminAccount = mockCreateAdminAccount;

      const result = await createUserAccountDomain.createAdminAccount(dto);

      expect(result).toBe(true);
      expect(mockCreateAdminAccount).toHaveBeenCalledWith(dto);
    });

    it('should throw error when createAdminAccount fails', async () => {
      const dto: CreateAdminAccountDTO = {
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        agentTypeId: 2,
        email: 'john.doe@example.com',
        password: 'password123',
        companyName: 'Example Company',
        cnpj: '12345678901234',
        commercialName: 'Example',
        companyLink: 'example.com',
        phones: [{ phone: '123456789', type: 'mobile' }]
      };

      const mockError = new Error('Network Error');
      const mockCreateAdminAccount = jest.fn().mockRejectedValue(mockError);
      createUserAccountDomain['loginDataGateway'].createAdminAccount = mockCreateAdminAccount;

      await expect(createUserAccountDomain.createAdminAccount(dto)).rejects.toThrow(GlobalError);
    });
  });

  describe('createUserAccount', () => {
    it('should create user account successfully', async () => {
      const dto: CreateUserAccountDTO = {
        hash: 'hash',
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password123',
        phones: [{ phone: '123456789', type: 'mobile' }]
      };

      const mockCreateUserAccount = jest.fn().mockResolvedValue(true);
      createUserAccountDomain['loginDataGateway'].createUserAccount = mockCreateUserAccount;

      const result = await createUserAccountDomain.createUserAccount(dto);

      expect(result).toBe(true);
      expect(mockCreateUserAccount).toHaveBeenCalledWith(dto);
    });

    it('should throw error when createUserAccount fails', async () => {
      const dto: CreateUserAccountDTO = {
        hash: 'hash',
        name: 'John',
        surname: 'Doe',
        userTypeId: 1,
        email: 'john.doe@example.com',
        password: 'password123',
        phones: [{ phone: '123456789', type: 'mobile' }]
      };

      const mockError = new Error('Network Error');
      const mockCreateUserAccount = jest.fn().mockRejectedValue(mockError);
      createUserAccountDomain['loginDataGateway'].createUserAccount = mockCreateUserAccount;

      await expect(createUserAccountDomain.createUserAccount(dto)).rejects.toThrow(GlobalError);
    });
  });
});
