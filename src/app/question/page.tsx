"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const questions = [
  {
    "q": "팀 분위기가 좋다면 연봉이 조금 낮아도 괜찮다고 생각한다.",
    "a": 0,
    "info": ["r", "i"]
  },
  {
    "q": "개인의 성장 기회가 동료와의 관계보다 더 중요하다고 본다.",
    "a": 0,
    "info": ["v", "r"]
  },
  {
    "q": "동료와의 관계가 회사의 복지 제도보다 업무 만족도에 더 큰 영향을 미친다.",
    "a": 0,
    "info": ["r", "p"]
  },
  {
    "q": "팀워크가 좋다면 업무 시간이 길어져도 감내할 수 있다.",
    "a": 0,
    "info": ["r", "b"]
  },
  {
    "q": "미래가 밝은 스타트업이라면 연봉이 낮아도 선택할 것이다.",
    "a": 0,
    "info": ["v", "i"]
  },
  {
    "q": "연봉이 높다면 회사의 복리후생이 부족해도 참을 수 있다.",
    "a": 0,
    "info": ["i", "p"]
  },
  {
    "q": "급여가 만족스럽다면 초과 근무도 기꺼이 할 수 있다.",
    "a": 0,
    "info": ["i", "b"]
  },
  {
    "q": "전문성을 키울 수 있는 환경이라면 회사의 분위기가 딱딱해도 견딜 만하다.",
    "a": 0,
    "info": ["v", "p"]
  },
  {
    "q": "자기 발전을 위해서는 개인 시간을 어느 정도 포기할 수 있다.",
    "a": 0,
    "info": ["v", "b"]
  },
  {
    "q": "회사의 복지가 훌륭하다면 업무 강도가 높아도 수용할 수 있다.",
    "a": 0,
    "info": ["p", "b"]
  },
  {
    "q": "연봉수준이 높은 회사가 유능하고 친절한 동료들과 일할 수 있는 회사보다 더 매력적이다.",
    "a": 0,
    "info": ["i", "r"]
  },
  {
    "q": "뛰어난 동료들과 일할 수 있다면 나의 경력 계획을 조정할 수 있다.",
    "a": 0,
    "info": ["r", "v"]
  },
  {
    "q": "회사의 제도와 문화가 좋다면 팀 구성원들이 마음에 들지 않아도 감수할 수 있다.",
    "a": 0,
    "info": ["p", "r"]
  },
  {
    "q": "일과 삶의 균형이 잡혀있다면 동료들과의 관계가 서먹해도 견딜 만하다.",
    "a": 0,
    "info": ["b", "r"]
  },
  {
    "q": "고연봉이라면 자기 계발의 기회가 적어도 받아들일 수 있다.",
    "a": 0,
    "info": ["i", "v"]
  },
  {
    "q": "회사의 복지 제도가 잘 갖춰져 있다면 연봉이 조금 낮아도 선택할 것이다.",
    "a": 0,
    "info": ["p", "i"]
  },
  {
    "q": "개인 생활과 업무의 균형이 잘 잡혀있다면 연봉이 조금 낮아도 만족할 수 있다.",
    "a": 0,
    "info": ["b", "i"]
  },
  {
    "q": "회사의 분위기와 직원 혜택이 개인의 성장 기회보다 더 중요하다고 생각한다.",
    "a": 0,
    "info": ["p", "v"]
  },
  {
    "q": "일과 삶의 균형이 개인의 커리어 성장보다 우선시되어야 한다고 본다.",
    "a": 0,
    "info": ["b", "v"]
  },
  {
    "q": "근무 시간이 유연하다면 회사의 복리후생이 부족해도 감수할 수 있다.",
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
      <main className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-blue-600 font-semibold">결과를 분석하고 있습니다...</p>
        </div>
      </main>
    )
  }

  const questionComponent = () => {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
        <div className="max-w-2xl mx-auto px-4">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <button 
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                onClick={() => {
                  if (questionNumber === 0) return;
                  setQuestionNumber(questionNumber - 1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-600 font-medium">{questionNumber + 1} / 20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${(questionNumber + 1) * 5}%` }}></div>
            </div>
          </section>
          <section className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Q{questionNumber + 1}.</h3>
            <h4 className="text-xl text-gray-700 leading-relaxed">
              {questions[questionNumber].q}
            </h4>
          </section>
          <section className="space-y-3">
            {['매우 아니다', '아니다', '보통이다', '그렇다', '매우 그렇다'].map((answer, index) => (
              <button 
                key={index}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-0"
                onClick={() => { answerClickHandler(index + 1); }}
              >
                {answer}
              </button>
            ))}
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