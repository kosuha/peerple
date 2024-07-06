const MainPage = () => {
  return (
    <main className="p-2 flex flex-col items-center">
      <div>
        <section className="p-1">
          <h2 className="">
            컬쳐핏 진단 테스트
          </h2>
          <h1 className="text-4xl font-black">
            나만의 컬쳐핏을 알아보자!
          </h1>
          <div>
            총 20문항, 예상 소요시간 5분
          </div>
        </section>
        <section className="p-1">
          <a href="/question">
            <button className="w-full border border-black p-4">시작하기</button>
          </a>
        </section>
        <section className="p-1">
          <button className="w-full border border-black p-1 mt-1">테스트 공유하기</button>
          <button className="w-full border border-black p-1 mt-1">peerple 알아보기</button>
        </section>
      </div>
    </main>
  )
}

export default MainPage