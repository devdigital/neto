import ls from 'local-storage'
import Url from 'url-parse'

export const isAuthenticated = () => {
  const token = ls.get('trello-token')
  return token != null
}

export const signIn = options => {
  const uri = `https://trello.com/1/authorize?response_type=token&key=${
    options.key
  }&redirect_uri=${
    options.redirectUri
  }&callback_method=fragment&scope=read&expiration=${
    options.expiration
  }&name=neto`

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
