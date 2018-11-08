export interface IEnvironment {
  /**
   * Production mode or not
   */
  production: boolean;
  /**
   * Use hash or not
   */
  hashLocationStrategy: boolean;
  /**
   * Debug Mode
   */
  debug: boolean;
  /**
   * makes the router log all its internal events to the console.
   */
  enableTracing: boolean;
  /**
   * App specific settings
   */
  appSettings: any;
}
