import React from 'react'
import { NavBar } from "../app/components/NavBar";
import Footer from "../app/components/Footer";

export default function about() {
  return (
    <>
      <NavBar />
        <div className="p-4">
          <h2 className="mt-5 text-2xl font-bold mb-2">ano sonoアプリケーションについて</h2>
          <p className="mt-10 text-base text-gray-600">
            ・このアプリケーションは、<br />
          </p>
        </div>
      <Footer />
    </>
  )
}
