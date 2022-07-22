import { API_REQUEST } from './actions';
import Axios from 'axios';

// this middleware care only for API calls
export const fetchApi =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === API_REQUEST) {
      const { method, URL, /*body,*/ config, onSuccess, onFailure } =
        action.payload;
      if (method === 'GET') {
        Axios.get(URL, config)
          .then((response) => {
            // if (error) {
            //   return dispatch({ type: onFailure, payload: errorMsg });
            // }
            console.log('response is:', response);
            return dispatch({ type: onSuccess, payload: response });
          })
          .catch((errorMsg) => {
            return dispatch({ type: onFailure, payload: errorMsg });
          });
      }
      if (method === 'POST') {
      }
      if (method === 'PATCH') {
      }
    }
    return next(action);
  };
