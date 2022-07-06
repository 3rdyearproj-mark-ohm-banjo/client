import Head from 'next/head'
import React from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'

const Forwarding = () => {
  return (
    <>
      <Head>
        <title>หนังสือที่ต้องส่งต่อ</title>
      </Head>
      <div>หนังสือที่ต้องส่งต่อ</div>
    </>
  )
}

Forwarding.Layout = ProfileLayout

export default Forwarding
