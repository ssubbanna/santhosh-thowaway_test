export interface ISystemCalls {
  loading: boolean | undefined;
  error: object | undefined;
  payload: object | undefined;
  successful: boolean;
  siteId: string;
  location: string;
  type: string;
  node: string;
}

export function systemsFactory(): ISystemCalls {
  return {
    loading: undefined,
    error: undefined,
    payload: undefined,
    successful: false,
    siteId: undefined,
    location: undefined,
    type: undefined,
    node: undefined
  };
}
