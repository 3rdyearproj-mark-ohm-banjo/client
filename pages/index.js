import Head from 'next/head'
import { Icon, Layout } from '../components'

export default function Home() {
  return (
    <>
      <Head>
        <title>Share my Book</title>
        <meta
          name='description'
          content='INT365/371 Share my Book Application'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <div>hello</div>
        <Icon />
      </Layout>
    </>
  )
}
