import dynamic from 'next/dynamic'

const Home = dynamic(() => import('../components/home'), {
  ssr: false
})

export default function Page() {
  return <Home />
}