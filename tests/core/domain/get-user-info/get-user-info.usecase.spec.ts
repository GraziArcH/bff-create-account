import { GetUserInfoUseCase } from "@/core/domain/get-user-info/get-user-info.usecase";
import IGetUserInfoRepository from "@/core/domain/get-user-info/repository/iget-user-info.repository";


describe('GetUserInfoUseCase', () => {
  let getUserInfoUseCase: GetUserInfoUseCase;
  let mockRepository: jest.Mocked<IGetUserInfoRepository>;

  beforeEach(() => {
    mockRepository = {
      getUserInfo: jest.fn(),
    } as unknown as jest.Mocked<IGetUserInfoRepository>;
    getUserInfoUseCase = new GetUserInfoUseCase(mockRepository);
  });

  it('should call getUserInfoRepository with correct userId', async () => {
    const userId = '123';
    await getUserInfoUseCase.getUserInfo(userId);
    expect(mockRepository.getUserInfo).toHaveBeenCalledWith(userId);
  });

  it('should return correct user info', async () => {
    const userInfoResponse = {
      name: 'John',
      surname: 'Doe',
      idpUserId: '123',
      userTypeId: 1,
      admin: true,
      companyId: 456,
      active: true,
      createdAt: new Date(),
    };
    mockRepository.getUserInfo.mockResolvedValue(userInfoResponse);

    const result = await getUserInfoUseCase.getUserInfo('123');
    expect(result).toEqual(userInfoResponse);
  });
});
