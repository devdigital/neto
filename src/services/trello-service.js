import ls from 'local-storage'
import Url from 'url-parse'
import axios from 'axios'

export const isAuthenticated = () => {
  const token = ls.get('trello-token')
  return token != null
}

const key = 'd97ebb62dc6a94fda5b7625489fe22a6'

export const signIn = options => {
  const redirectUri = 'http://localhost:1234/signed-in' // 'http://neto.netlify.com/signed-in',
  const expiration = '30days'

  const uri = `https://trello.com/1/authorize?response_type=token&key=${key}&redirect_uri=${redirectUri}&callback_method=fragment&scope=read&expiration=${expiration}&name=neto`

  window.location = uri
}

export const signedIn = () => {
  const url = new Url(window.location.href)
  const token = url.hash ? url.hash.substring('#token='.length) : null
  if (!token) {
    throw new Error('Attempting to sign in with no token present in hash.')
  }

  ls.set('trello-token', token)
}

export const onCallback = () => {
  const url = new Url(window.location.href)
  return url.hash && url.hash.includes('#token')
}

export const get = (uri, query) => {
  return new Promise((resolve, reject) => {
    const token = ls.get('trello-token')
    if (!token) {
      reject(new Error('No trello token available.'))
    }

    const querystring = query
      ? Object.keys(query)
          .map(k => `${k}=${query[k]}`)
          .join('&')
      : null

    const fullUri = `https://api.trello.com/1/${uri}?key=${key}&token=${token}&${querystring}`

    axios
      .get(fullUri)
      .then(response => resolve(response.data))
      .catch(error =>
        reject({
          statusCode: error.status,
          message: error.responseText,
        })
      )
  })
}
