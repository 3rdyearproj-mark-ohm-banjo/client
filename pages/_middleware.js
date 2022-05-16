import {NextResponse} from 'next/server'
import jwt_decode from 'jwt-decode'

const middleware = (req) => {
  const {cookies} = req
  const authToken = cookies.jwt
  const url = req.url
  const currentUrl = req.nextUrl.clone()
  const secret = process.env.SECRET_KEY

  if (url.includes('/profile')) {
    if (!authToken) {
      currentUrl.pathname = '/'
      return NextResponse.redirect(currentUrl)
    }
    try {
      jwt_decode(authToken)
      return NextResponse.next()
    } catch (e) {
      currentUrl.pathname = '/'
      return NextResponse.redirect(currentUrl)
    }
  }
  return NextResponse.next()
}

export default middleware
