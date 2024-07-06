"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const questions = [
  {
    "q": "연봉 수준이 낮더라도 원만한 관계의 팀원과 일하는 것이 좋다.",
    "a": 0,
    "info": ["r", "i"]
  },
  {
    "q": "나의 비전과 커리어 성장이 동료와의 원만한 관계보다 우선이다.",
    "a": 0,
    "info": ["v", "r"]
  },
  {
    "q": "좋은 동료와 일하는 것이 복지와 사내문화보다 중요하다.",
    "a": 0,
    "info": ["r", "p"]
  },
  {
    "q": "좋은 동료와 함께 일한다면 야근이 많아도 괜찮다.",
    "a": 0,
    "info": ["r", "b"]
  },
  {
    "q": "낮은 연봉을 받더라도 비전이 있고 커리어 성장이 가능한 회사에 가고싶다.",
    "a": 0,
    "info": ["v", "i"]
  },
  {
    "q": "높은 급여을 받는다면 좋은 복지는 포기할 수 있다.",
    "a": 0,
    "info": ["i", "p"]
  },
  {
    "q": "연봉만 높다면 야근은 충분히 할 수 있다.",
    "a": 0,
    "info": ["i", "b"]
  },
  {
    "q": "커리어 성장이 가능한 회사라면 복지와 사내문화가 나빠도 괜찮다.",
    "a": 0,
    "info": ["v", "p"]
  },
  {
    "q": "커리어 성장을 위해서 워라밸은 포기해야한다.",
    "a": 0,
    "info": ["v", "b"]
  },
  {
    "q": "복지와 사내문화가 좋은 팀이라면 야근을 불사하고 일 할 수 있다.",
    "a": 0,
    "info": ["p", "b"]
  },
  {
    "q": "높은 연봉을 받는 것이 유능하고 함께하고 싶은 동료보다 중요하다.",
    "a": 0,
    "info": ["i", "r"]
  },
  {
    "q": "유능하고 좋은 동료와 함께라면 커리어 계획은 어느정도 포기 할 수 있다.",
    "a": 0,
    "info": ["r", "v"]
  },
  {
    "q": "복지와 사내문화가 좋은 팀이라면 동료가 마음에 들지 않아도 괜찮다.",
    "a": 0,
    "info": ["p", "r"]
  },
  {
    "q": "워라밸이 좋은 팀이라면 동료가 마음에 들지 않아도 상관없다.",
    "a": 0,
    "info": ["b", "r"]
  },
  {
    "q": "비전이 다르고 커리어 성장이 힘든 회사여도 연봉을 많이 받는다면 괜찮다.",
    "a": 0,
    "info": ["i", "v"]
  },
  {
    "q": "복지와 사내문화가 좋다면 낮은 연봉을 감수 할 수 있다.",
    "a": 0,
    "info": ["p", "i"]
  },
  {
    "q": "워라밸이 좋다면 연봉이 낮아도 상관없다.",
    "a": 0,
    "info": ["b", "i"]
  },
  {
    "q": "복지와 사내문화가 비전과 커리어 성장보다 중요하다.",
    "a": 0,
    "info": ["p", "v"]
  },
  {
    "q": "워라밸이 커리어 성장과 비전보다 중요하다.",
    "a": 0,
    "info": ["b", "v"]
  },
  {
    "q": "워라밸이 좋은 회사라면 복지와 사내문화가 안좋아도 상관없다.",
    "a": 0,
    "info": ["b", "p"]
  }
]

const QuestionPage = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const answerClickHandler = (answerType: number) => {
    questions[questionNumber].a = answerType;
    if (questionNumber >= 19) {
      setIsLoading(true);
      setQuestionNumber(0);

      const url = "https://16m1evfr39.execute-api.ap-northeast-2.amazonaws.com/production/question_result"
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: questions }),
      }

      fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        router.push(`/question/result/?i=${data.income}&v=${data.vision}&r=${data.relationship}&b=${data.balance}&p=${data.perks}`);
      });
      return;
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  }

  const loadingComponent = () => {
    return (
      <main>
        <div className="flex flex-col items-center">
          <section>
            Loading...
          </section>
        </div>
      </main>
    )
  }

  const questionComponent = () => {
    return (
      <main>
        <div className="flex flex-col items-center">
          <section className="flex items-center justify-center p-5">
            <button className="border border-black rounded-full text-xs h-8 w-8"
                    onClick={() => {
                      if (questionNumber === 0) {
                        return;
                      }
                      setQuestionNumber(questionNumber - 1);
                    }}
            >←</button>
            <div className="min-w-72 h-8 mx-2 bg-gray-200 rounded-full">
              <div className="h-full min-w-8 bg-blue-500 rounded-full" style={{ width: `${(questionNumber) * 5}%` }}></div>
            </div>
            <div className="w-8"></div>
          </section>
          <section className="flex flex-col items-center p-10">
            <h3 className="text-2xl">Q{questionNumber + 1}.</h3>
            <h4 className="text-xl">
              {questions[questionNumber].q ? questions[questionNumber].q : ""}
            </h4>
          </section>
          <section className="flex flex-col items-center w-full p-10">
            <button className="w-full border border-black px-8 py-2 m-1 max-w-96" onClick={() => { answerClickHandler(1); }}>매우 아니다</button>
            <button className="w-full border border-black px-8 py-2 m-1 max-w-96" onClick={() => { answerClickHandler(2); }}>아니다</button>
            <button className="w-full border border-black px-8 py-2 m-1 max-w-96" onClick={() => { answerClickHandler(3); }}>보통이다</button>
            <button className="w-full border border-black px-8 py-2 m-1 max-w-96" onClick={() => { answerClickHandler(4); }}>그렇다</button>
            <button className="w-full border border-black px-8 py-2 m-1 max-w-96" onClick={() => { answerClickHandler(5); }}>매우 그렇다</button>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main>
      {isLoading ? loadingComponent() : questionComponent()}
    </main>
  )
}

export default QuestionPage