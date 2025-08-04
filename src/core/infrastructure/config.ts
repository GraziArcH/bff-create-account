import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Interface para definir o tipo de configuração.
 */
export interface ConfigType {
  MS_LOGIN_BASE_URL: string;
  BFF_CREATE_ACCOUNT_PORT: string;
  FRONTEND_URL: string;
  VAULT_URL: string;
  VAULT_ROLE_NAME: string;
  VAULT_TOKEN: string;
  VAULT_ENV: string;
  LIB_INFRASTRUCTURE_POSTGRES_USER: string;
  LIB_INFRASTRUCTURE_POSTGRES_PASSWORD: string;
  LIB_INFRASTRUCTURE_POSTGRES_PORT: string;
  LIB_INFRASTRUCTURE_POSTGRES_HOST: string;
  LIB_INFRASTRUCTURE_POSTGRES_SSL: string;
  LIB_SALES_POSTGRES_USER: string;
  LIB_SALES_POSTGRES_PASSWORD: string;
  LIB_SALES_POSTGRES_PORT: string;
  LIB_SALES_POSTGRES_HOST: string;
  LIB_SALES_POSTGRES_SSL: string;
}

/**
 * Objeto de configuração que carrega as variáveis de ambiente.
 */
export const config: ConfigType = {
  MS_LOGIN_BASE_URL: process.env.MS_LOGIN_BASE_URL,
  BFF_CREATE_ACCOUNT_PORT: process.env.BFF_CREATE_ACCOUNT_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  VAULT_URL: process.env.VAULT_URL,
  VAULT_ROLE_NAME: process.env.VAULT_ROLE_NAME,
  VAULT_TOKEN: process.env.VAULT_TOKEN,
  VAULT_ENV: process.env.VAULT_ENV,
  LIB_INFRASTRUCTURE_POSTGRES_USER:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_USER,
  LIB_INFRASTRUCTURE_POSTGRES_PASSWORD:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_PASSWORD,
  LIB_INFRASTRUCTURE_POSTGRES_PORT:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_PORT,
  LIB_INFRASTRUCTURE_POSTGRES_HOST:
    process.env.LIB_INFRASTRUCTURE_POSTGRES_HOST,
  LIB_INFRASTRUCTURE_POSTGRES_SSL: process.env.LIB_INFRASTRUCTURE_POSTGRES_SSL,
  LIB_SALES_POSTGRES_USER: process.env.LIB_SALES_POSTGRES_USER,
  LIB_SALES_POSTGRES_PASSWORD: process.env.LIB_SALES_POSTGRES_PASSWORD,
  LIB_SALES_POSTGRES_PORT: process.env.LIB_SALES_POSTGRES_PORT,
  LIB_SALES_POSTGRES_HOST: process.env.LIB_SALES_POSTGRES_HOST,
  LIB_SALES_POSTGRES_SSL: process.env.LIB_SALES_POSTGRES_SSL
};

/**
 * Valida as variáveis de ambiente, garantindo que todas estejam definidas.
 * @throws {GlobalError} - Lança um erro global se alguma variável de ambiente estiver ausente.
 */
export const validateEnvVars = (): void => {
  const nullVariablesList: string[] = [];

  // Itera sobre as variáveis de configuração e verifica se alguma está nula
  for (const variable in config) {
    const value = config[variable as keyof ConfigType];

    if (!value) {
      nullVariablesList.push(variable);
    }
  }

  // Se houver variáveis nulas, lança um erro com a lista das variáveis nulas
  if (nullVariablesList.length > 0) {
    const messageError = `As variáveis ${nullVariablesList.join(', ')} estão nulas ou indefinidas`;
    console.error(messageError);
    throw new Error(messageError);
  }
};
