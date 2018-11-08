import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  hashLocationStrategy: false,
  debug: true,
  enableTracing: false,
  appSettings: {
    productName: 'Extreme Central',
    api: {
      protocol: 'http://',
      port: '10010',
      host: '10.68.61.230',
      restUri: '/extreme-central/'
    }
  }
};
