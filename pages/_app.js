import {getGlobalStyle} from '../styles/globalStyles'
import {config as fontAwesomeConfig} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavigationBar from '../components/NavigationBar'
import {QueryClient, QueryClientProvider} from 'react-query'
import {queryClientConfig} from '../config/query-client'
import {UserContextProvider} from '../context/userContext'
import axios from 'axios'

fontAwesomeConfig.autoAddCss = false
const GlobalStyle = getGlobalStyle()
const queryClient = new QueryClient(queryClientConfig)
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
axios.defaults.withCredentials = true

function MyApp({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GlobalStyle />
        <main>
          <NavigationBar />
          <Component {...pageProps} />
        </main>
      </UserContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
