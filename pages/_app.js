import {getGlobalStyle} from '../styles/globalStyles'
import {config as fontAwesomeConfig} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {QueryClient, QueryClientProvider} from 'react-query'
import {queryClientConfig} from '../config/query-client'
import axios from 'axios'
import UserLayout from '../components/layouts/UserLayout'
import {Provider} from 'react-redux'
import {store} from '../redux/store'

fontAwesomeConfig.autoAddCss = false
const GlobalStyle = getGlobalStyle()
const queryClient = new QueryClient(queryClientConfig)
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
axios.defaults.withCredentials = true

function MyApp({Component, pageProps}) {
  const Layout = Component.Layout || UserLayout
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  )
}

export default MyApp
