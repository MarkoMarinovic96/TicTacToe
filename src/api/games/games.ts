import { axios } from '../../lib/axios';
import { storage } from '../../lib/storage';

export const getGames = async (
  offset: number = 0,
  limit: number = 10,
  selectedStatus: string = ''
): Promise<any> => {
  try {
    const token = storage.getToken();

    const response = await axios.get(
      `/games/?offset=${offset}&limit=${limit}${selectedStatus ? `&status=${selectedStatus}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const postGames = async (): Promise<any> => {
  try {
    const token = storage.getToken();
    const response = await axios.post('/games/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error posting game:', error);
    throw error;
  }
};

export const getSingleGame = async (id: string): Promise<any> => {
  try {
    const token = storage.getToken();
    const response = await axios.get(`/games/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching single game:', error);
    throw error;
  }
};

export const postJoinGame = async (id: string): Promise<any> => {
  try {
    const token = storage.getToken();
    const response = await axios.post(`/games/${id}/join/`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error joining game:', error);
    throw error;
  }
};

export const postMakeMove = async (
  id: string,
  row: number,
  col: number
): Promise<any> => {
  try {
    const token = storage.getToken();
    const payload = {
      row: row,
      col: col
    };
    const response = await axios.post(`/games/${id}/move/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Error making move:', error);
    throw error;
  }
};
