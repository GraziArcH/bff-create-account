export interface CreateAdminAccountDTO {
  name: string;
  surname: string;
  userTypeId: number;
  agentTypeId: number;
  email: string;
  password: string;
  companyName: string;
  cnpj: string;
  commercialName: string;
  companyLink: string;
  phones: [{ phone: string; type: string }];
}

export interface CreateUserAccountDTO {
  hash: string;
  name: string;
  surname: string;
  userTypeId: number;
  email: string;
  password: string;
  phones: [{ phone: string; type: string }];
}
