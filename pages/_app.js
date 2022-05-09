import {getGlobalStyle} from '../styles/globalStyles'
import {config as fontAwesomeConfig} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavigationBar from '../components/NavigationBar'
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query'
import {queryClientConfig} from '../config/query-client'

fontAwesomeConfig.autoAddCss = false

const GlobalStyle = getGlobalStyle()
const queryClient = new QueryClient(queryClientConfig)

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <NavigationBar />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
