import { getAccessToken } from '../js/authentication/AuthService'
import config from '../../config/config'
import axios from 'axios'

export function requestAPI (path, method = 'GET', data = null) {
  const token = getAccessToken()

  return axios({
    method: method,
    url: `${config.APIUrl}${path}`,
    headers: { Authorization: `Bearer ${token}` },
    data
  }).then(response => response.data)
}
