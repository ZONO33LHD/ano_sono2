import React from 'react'
import { NavBar } from "../app/components/NavBar";
import Footer from "../app/components/Footer";
import Lottie from 'lottie-react';
import animationData from '../../public/picopico.json';
import checkAnimeData from '../../public/CheckAnime.json';

export default function about() {
  return (
    <>
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <NavBar />
        <div className="p-4">
          <Lottie animationData={animationData} style={{ height: 400, width: 400 }} />
          <div className="flex items-center">
            <Lottie animationData={checkAnimeData} style={{ height: '3em', width: '3em' }} />
            <h1 className="mt-5 text-4xl font-bold mb-2 ml-4">ano sonoアプリケーションについて</h1>
          </div>
          <p className="mt-10 mb-15 text-2xl text-gray-600 leading-10">
            ・ano sonoは、ユーザーがブログ記事を簡単に検索、保存、共有できるウェブアプリケーションです。<br />
            ・ユーザーはキーワードを入力してブログ記事を検索し、気に入った記事を保存できます。<br />
            ・保存した記事はいつでも閲覧可能で、友人と共有することもできます。<br />
            ・また、ユーザーは記事のタイトルや説明を編集して、自分だけのメモを追加することができます。<br />
          </p>
        </div>
      <Footer />
      </div>
    </>
  )
}