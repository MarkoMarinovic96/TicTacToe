import { axios } from '../../lib/axios';
import { storage } from '../../lib/storage';

export const getUser = async (
  offset: number = 0,
  limit: number = 10
): Promise<any> => {
  try {
    const token = storage.getToken();
    const response: any = await axios.get(
      `/users/?offset=${offset}&limit=${limit}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const getSingleUser = async (id: string): Promise<any> => {
  try {
    const token = storage.getToken();
    const response: any = await axios.get(`/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
