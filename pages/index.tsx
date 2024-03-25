import Header3 from '@/components/Header3'
import Header1 from '../components/Header1'
import Header2 from '@/components/Header2'
import Image from 'next/image'
import Head from 'next/head'
import Header4 from '@/components/Header4'
import Footer from '@/components/Footer'

function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icon.png" />
        <title>
          OYO : India`s Best Online Hotel Booking Site For Sanitized Stay.
        </title>
      </Head>
      <Header1 />
      <Header2 />
      <Header3 />
      <div className="mx-20">
        <div className=" my-14">
          <Image
            src={"/banner1.avif"}
            alt="banner1"
            width={200}
            height={200}
            className=" h-80 w-full"
          />
        </div>
        <div className="mb-14">
          <Image
            src={"/banner2.avif"}
            alt="banner1"
            width={200}
            height={200}
            className=" h-40 w-full"
          />
        </div>
      </div>
      <Header4 />
      <Footer/>
    </div>
  )
}

export default Home