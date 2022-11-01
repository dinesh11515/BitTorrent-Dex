import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BitTorrent Dex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex items-center mx-20 pt-10'>
        <div>
          <p className="text-6xl font-bold font-['Exo_2'] italic">The most intuitive way to buy and sell crypto in BitTorrent Chain</p>
          <p className='text-gray-600 mt-4 text-xl'>A Peer to peer decentralised crypto marketplace where user can sell and buy BitTorrent chain cryptocurrencies using any payment method.</p>
          <button className='px-6 py-3 bg-black text-white mt-4'>Get Started</button>
        </div>
        <img src="/p2p.png" alt="p2p" className='w-1/2 h-2/3'></img>
      </div>
    </div>
  )
}

export default Home
