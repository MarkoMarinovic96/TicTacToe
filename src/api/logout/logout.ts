import { axios } from '../../lib/axios';

export const postLogout = async (): Promise<any> => {
  const response: any = await axios.post(`/logout/`);

  return response;
};
