import axios from 'axios';
import { toast } from 'react-toastify';

const apiService = () => {
  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'token':`${token}`
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message)
        if(error.response.status==408){
            setTimeout(() => {
                window.location.href = '/'
            }, 1000);
        }
        // console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      return Promise.reject(error);
    }
  );

  const get = async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const post = async (url, data = {}) => {
    try {
      const response = await api.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const put = async (url, data = {}) => {
    try {
      const response = await api.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const del = async (url) => {
    try {
      const response = await api.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { get, post, put, del };
};

export default apiService;
