"use client"

import React, { useState } from 'react';

const CulturefitPage = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // 2초 후 메시지 숨김
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <main className="p-4 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition duration-300">
        <section className="text-center mb-8">
          <h2 className="text-xl text-indigo-600 font-semibold mb-3">
            컬쳐핏 진단 테스트
          </h2>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            나만의 컬쳐핏을<br/>알아보자!
          </h1>
          <div className="text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2 inline-block">
            총 20문항, 예상 소요시간 5분
          </div>
        </section>
        <section className="mb-8">
          <p className="text-gray-700 text-left leading-relaxed">
            컬쳐핏 진단 테스트는 당신의 가치관, 선호도, 행동 패턴을 분석하여 
            어떤 기업 문화를 선호하는지 알아봅니다. 
            자신에게 맞는 회사를 찾고 싶다면 지금 시작해보세요!
          </p>
        </section>
        <section className="mb-6">
          <a href="/question" className="block">
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
              테스트 시작하기
            </button>
          </a>
        </section>
        <section className="space-y-3">
          <button 
            onClick={copyToClipboard}
            className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-2 px-4 border border-indigo-300 rounded-full shadow-sm transition duration-300 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            {copySuccess ? '링크가 복사되었습니다!' : '테스트 링크 복사하기'}
          </button>
          <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            peerple 알아보기
          </button>
        </section>
      </div>
    </main>
  )
}

export default CulturefitPage