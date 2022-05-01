import {getGlobalStyle} from '../styles/globalStyles'
import {config as fontAwesomeConfig} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavigationBar from '../components/NavigationBar'
fontAwesomeConfig.autoAddCss = false

const GlobalStyle = getGlobalStyle()

function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalStyle />
      <NavigationBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
