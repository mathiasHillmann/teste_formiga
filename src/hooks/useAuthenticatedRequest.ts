import useMessage from 'antd/es/message/useMessage';
import axios, { AxiosInstance } from 'axios';

export function useAuthenticatedRequest() {
  const [message] = useMessage();
  const http = axios.create({
    baseURL: 'http://192.168.1.59:5000/api',
  });

  const httpClient = (): AxiosInstance => {
    http.interceptors.request.use((request) => {
      request.headers.Authorization = 'Bearer 4|hBpG7YzINM0bx6USaOilky6XEzEf5EmzkTIbsO9n79e96bba';

      return request;
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(error);

        if (error.request?.status === 401) {
          message.error('Sessão expirada');
        }

        if (error.request?.status === 0) {
          message.error('Erro de conexão com a internet');
        }

        throw error;
      },
    );

    return http;
  };

  return { httpClient };
}
