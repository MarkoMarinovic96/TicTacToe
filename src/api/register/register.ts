import { axios } from '../../lib/axios';

export const postRegister = async (
  username: string,
  password: string
): Promise<any> => {
  const payload = {
    username: username,
    password: password
  };

  const response: any = await axios.post(`/register/`, payload);

  return response;
};
