import { axios } from '../../lib/axios';

export const postLogin = async (payload: {
  username: string;
  password: string;
}): Promise<any> => {
  const response: any = await axios.post(`/login/`, payload);
  return response;
};
