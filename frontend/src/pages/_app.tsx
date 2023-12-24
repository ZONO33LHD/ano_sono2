// ano_sono/frontend/ano_sono/src/pages/_app.tsx
import '../app/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp