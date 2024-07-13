"use client"

import React, { useState } from 'react';

const MainPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmail = async (email: string) => {
    setIsLoading(true);
    const url = "https://16m1evfr39.execute-api.ap-northeast-2.amazonaws.com/production/regist_email";
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: email }),
    }

    try {
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      setEmail('');
      alert('알림 신청이 완료되었습니다. 감사합니다!');
    } catch (error) {
      console.error('Error:', error);
      alert('알림 신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchEmail(email);
  };

  // 버튼 컴포넌트
  const SubmitButton = ({ isLoading, children }: { isLoading: boolean, children: React.ReactNode }) => (
    <button
      type="submit"
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 h-14 rounded-full transition duration-300 shadow-md text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex flex-col items-center">
          <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : children}
    </button>
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen font-sans">
      <header className="bg-white shadow-lg rounded-b-3xl">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-blue-600 tracking-tight">peerple</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-tight text-wrap">
            <span>인재 추천을 위한</span>
            <br />
            <span className="text-blue-600">비지니스 네트워킹</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-wrap">
            peerple은 실무자들이 직접 동료를 찾을 수 있는 비지니스 네트워킹 플랫폼입니다.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                required
                className="flex-grow px-6 py-3 h-14 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md text-lg"
              />
              <SubmitButton isLoading={isLoading}>
                출시 알림받기
              </SubmitButton>
            </form>
          </div>
        </section>

        {/* 컬쳐핏 진단 테스트 섹션 */}
        <section className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white py-16 px-4 rounded-3xl mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">나의 컬쳐핏 찾기</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              어떤 기업 문화가 나와 잘 맞을까요? 컬쳐핏 진단 테스트로 알아보세요!
            </p>
            <a href="/culturefit" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full transition duration-300 shadow-md hover:bg-purple-100 text-lg">
              컬쳐핏 진단 테스트 시작하기
            </a>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-10 mb-16">
          {[
            { title: "실무자 직접 추천", description: "실제 함께 일할 동료들이 직접 인재를 찾고 추천합니다." },
            { title: "상세한 정보 공유", description: "채용 과정 전 실무자와의 소통을 통해 서로에 대한 자세한 정보를 공유합니다." },
            { title: "커피챗 네트워킹", description: "편안한 분위기의 커피챗으로 친밀감을 형성하고 채용 과정을 결정합니다." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">왜 peerple인가요?</h2>
          <p className="text-left text-md text-gray-600 mb-8 max-w-3xl mx-auto">
            peerple은 채용의 불확실성을 줄이고, 구직자와 기업 모두에게 더 나은 경험을 제공합니다.
            나와 비슷한 컬쳐핏을 가진 재직자와 소통하세요.
            실무자의 직접 추천, 상세한 정보 공유, 그리고 커피챗을 통한 네트워킹으로 
            더 나은 채용 결정을 내릴 수 있습니다.
          </p>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-500 to-pink-400 text-white py-16 px-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6">곧 출시됩니다!</h2>
          <p className="text-left text-xl mb-8 max-w-2xl mx-auto">
            채용의 미래를 함께 만들어갈 준비가 되셨나요?
            <br />
            지금 출시 알림을 신청하고 사전 신청 혜택을 누리세요.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력하세요"
              required
              className="flex-grow px-6 py-3 h-14 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md text-lg text-gray-800"
            />
            <SubmitButton isLoading={isLoading}>
              알림 신청하기
            </SubmitButton>
          </form>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16 rounded-t-3xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl">&copy; 2024 peerple. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;