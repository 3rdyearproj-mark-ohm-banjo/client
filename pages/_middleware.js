import {NextResponse} from 'next/server'
import {verify} from 'jsonwebtoken'

const middleware = (req) => {
  const {cookies} = req
  const jwt = cookies.jwt
  const url = req.url
  const currentUrl = req.nextUrl.clone()
  const secret = process.env.SECRET_KEY

  if (url.includes('/profile')) {
    if (!jwt) {
      currentUrl.pathname = '/'
      return NextResponse.redirect(currentUrl)
    }
    try {
      verify(jwt, secret)
      return NextResponse.next()
    } catch (e) {
      currentUrl.pathname = '/'
      return NextResponse.redirect(currentUrl)
    }
  }
  return NextResponse.next()
}

export default middleware
