import { css } from 'glamor'

const setGlobalStyles = () => {
  css.global('html, body', { padding: 0, fontFamily: 'Roboto' })
}

export default setGlobalStyles
