export interface GetUserInfoDtoResponse {
  name: string;
  surname: string;
  idpUserId: string;
  userTypeId: number;
  admin: boolean;
  companyId: number;
  active: boolean;
  createdAt?: Date;
}
