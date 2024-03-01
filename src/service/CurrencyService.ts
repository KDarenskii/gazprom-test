import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { api } from 'api/';

const ENDPOINT = '/currency';

export class CurrencyService {
  static getAll = async (
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<CurrencyInfo[]>> => {
    return api.get(ENDPOINT, config);
  };
}
