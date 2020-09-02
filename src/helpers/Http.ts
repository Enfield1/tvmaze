import axios, { AxiosPromise } from 'axios';
import { CANCEL } from 'redux-saga';

interface AxiosPromiseSaga extends AxiosPromise {
  [CANCEL: string]: Function;
}

export class Http {
  static get(url: string, params?: object): AxiosPromise {
    const source = axios.CancelToken.source();
    const request = axios.get(url, { params, cancelToken: source.token }) as AxiosPromiseSaga;
    request[CANCEL] = () => source.cancel();
    return request;
  }
}
