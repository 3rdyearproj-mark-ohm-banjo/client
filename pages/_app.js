import {getGlobalStyle} from '../styles/globalStyles'
import {config as fontAwesomeConfig} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavigationBar from '../components/NavigationBar'
import {QueryClient, QueryClientProvider} from 'react-query'
import {queryClientConfig} from '../config/query-client'
import {UserContextProvider} from '../context/userContext'
import {BASE_URL} from '../config/env'
import axios from 'axios'

fontAwesomeConfig.autoAddCss = false
const GlobalStyle = getGlobalStyle()
const queryClient = new QueryClient(queryClientConfig)
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GlobalStyle />
        <NavigationBar />
        <Component {...pageProps} />
      </UserContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
