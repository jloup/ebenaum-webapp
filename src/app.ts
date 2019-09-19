import { AxiosRequestConfig } from 'axios';
import page from 'page';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'restyped-axios';

import { API } from './api';

export const client = axios.create<API>({baseURL: API_URL});

client.interceptors.request.use((config) :AxiosRequestConfig => {
  config.headers = {
    'Content-Type': 'application/json',
  };

  return config;
});

client.interceptors.response.use((response) => response, (error) => {
  return Promise.reject(error);
});

type Response<T> = {
  data: T
};

// @ts-ignore: Type '"body"' cannot be used to index type 'API[Path]["POST"]'
export function request<Path extends keyof API> (url: Path, data?: API[Path]['POST']['body'])
  :Promise<Response<API[Path]['POST']['response']>> {

  return client.post(url, data);
}

export function start() :Promise<void[]> {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return Promise.all([page()]);
}

export function route(path: string, fn: (context: any) => void) {
  page(path, (context) => {
    fn(context);
  });
}

export function go(path: string) {
  page(path);
}

export function mount(app :any) {

  const root = React.createElement(
    React.Fragment,
    {},
    app
  );

  ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLElement);
  ReactDOM.render(root, document.getElementById('root'));
}
