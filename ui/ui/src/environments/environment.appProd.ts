import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  hashLocationStrategy: true,
  debug: false,
  enableTracing: false,
  appSettings: {
    productName: 'Extreme Central',
    api: {
      protocol: 'http://',
      port: '10010',
      host: '',
      restUri: '/extreme-central/'
    }
  }
};
