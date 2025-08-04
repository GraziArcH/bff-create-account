import { Request, Response, NextFunction } from 'express';
import IGetUserInfoRepository from '@/core/domain/get-user-info/repository/iget-user-info.repository';
import GlobalError from '@/errors';
import { UserMiddleware } from '@/middlewares/user.middleware';

const mockGetUserInfoRepository: IGetUserInfoRepository = {
  getUserId: jest.fn(),
  getUserInfo: jest.fn()
};

const userMiddleware = new UserMiddleware(mockGetUserInfoRepository);

describe('UserMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        userToken: 'valid-token',
      },
    };
    res = {};
    next = jest.fn();
  });

  it('should store the user ID in the request and call the next middleware function', async () => {

    (mockGetUserInfoRepository.getUserId as jest.Mock).mockResolvedValue('user-id-123');

    await userMiddleware.getUserId(req as Request, res as Response, next);

    expect(mockGetUserInfoRepository.getUserId).toHaveBeenCalledWith('valid-token');
    expect(req.userId).toBe('user-id-123');
    expect(next).toHaveBeenCalled();
  });

  it('should throw an error if the user ID is not found', async () => {

    (mockGetUserInfoRepository.getUserId as jest.Mock).mockResolvedValue(null);

    await expect(userMiddleware.getUserId(req as Request, res as Response, next))
      .rejects
      .toThrow(GlobalError);

    expect(mockGetUserInfoRepository.getUserId).toHaveBeenCalledWith('valid-token');
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw an error if an error occurs during the process', async () => {

    (mockGetUserInfoRepository.getUserId as jest.Mock).mockRejectedValue(new Error('Erro no repositório'));

    await expect(userMiddleware.getUserId(req as Request, res as Response, next))
      .rejects
      .toThrow(GlobalError);

    expect(mockGetUserInfoRepository.getUserId).toHaveBeenCalledWith('valid-token');
    expect(next).not.toHaveBeenCalled();
  });
});
