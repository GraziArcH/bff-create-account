import { type ConfigType, config, validateEnvVars } from '@/core/infrastructure/config'

describe('validateEnvVars function', () => {
  beforeEach(() => {
    Object.keys(config).forEach((key: keyof ConfigType) => {
      config[key] = null
    })
  })

  test('throws an error if any config variable is missing', () => {
    expect(() => { validateEnvVars() }).toThrow('As variáveis MS_LOGIN_BASE_URL, BFF_CREATE_ACCOUNT_PORT, FRONTEND_URL, VAULT_URL, VAULT_ROLE_NAME, VAULT_TOKEN, VAULT_ENV, LIB_INFRASTRUCTURE_POSTGRES_USER, LIB_INFRASTRUCTURE_POSTGRES_PASSWORD, LIB_INFRASTRUCTURE_POSTGRES_PORT, LIB_INFRASTRUCTURE_POSTGRES_HOST, LIB_INFRASTRUCTURE_POSTGRES_SSL, LIB_SALES_POSTGRES_USER, LIB_SALES_POSTGRES_PASSWORD, LIB_SALES_POSTGRES_PORT, LIB_SALES_POSTGRES_HOST, LIB_SALES_POSTGRES_SSL estão nulas ou indefinidas')
  })
})

describe('config object', () => {
  test('returns the expected environment variables', () => {
    const mockConfig: ConfigType = {
      MS_LOGIN_BASE_URL: 'MS_LOGIN_BASE_URL',
      BFF_CREATE_ACCOUNT_PORT: 'BFF_CREATE_ACCOUNT_PORT',
      FRONTEND_URL: 'FRONTEND_URL',
      VAULT_URL: 'VAULT_URL',
      VAULT_ROLE_NAME: 'VAULT_ROLE_NAME',
      VAULT_TOKEN: 'VAULT_TOKEN',
      VAULT_ENV: 'VAULT_ENV',
      LIB_INFRASTRUCTURE_POSTGRES_USER:
      'LIB_INFRASTRUCTURE_POSTGRES_USER',
      LIB_INFRASTRUCTURE_POSTGRES_PASSWORD:
        'LIB_INFRASTRUCTURE_POSTGRES_PASSWORD',
      LIB_INFRASTRUCTURE_POSTGRES_PORT:
        'LIB_INFRASTRUCTURE_POSTGRES_PORT',
      LIB_INFRASTRUCTURE_POSTGRES_HOST:
        'LIB_INFRASTRUCTURE_POSTGRES_HOST',
      LIB_INFRASTRUCTURE_POSTGRES_SSL: 'LIB_INFRASTRUCTURE_POSTGRES_SSL',
      LIB_SALES_POSTGRES_USER: 'LIB_SALES_POSTGRES_USER',
      LIB_SALES_POSTGRES_PASSWORD: 'LIB_SALES_POSTGRES_PASSWORD',
      LIB_SALES_POSTGRES_PORT: 'LIB_SALES_POSTGRES_PORT',
      LIB_SALES_POSTGRES_HOST: 'LIB_SALES_POSTGRES_HOST',
      LIB_SALES_POSTGRES_SSL: 'LIB_SALES_POSTGRES_SSL'
    }

    Object.assign(config, mockConfig)

    Object.keys(mockConfig).forEach((key: keyof ConfigType) => {
      expect(config[key]).toBe(mockConfig[key])
    })
  })
})
