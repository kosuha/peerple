"use client"

import { useSearchParams } from "next/navigation"
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { useState } from "react";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const QuestionResultPage = () => {
  const searchParams = useSearchParams()
 
  const income = Number(searchParams.get('i') || 0);
  const vision = Number(searchParams.get('v') || 0);
  const relationship = Number(searchParams.get('r') || 0);
  const balance = Number(searchParams.get('b') || 0);
  const perks = Number(searchParams.get('p') || 0);

  const [copySuccess, setCopySuccess] = useState(false);
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
      className={`bg-white hover:text-blue-800 text-blue-600 font-bold py-3 px-8 h-14 rounded-full transition duration-300 shadow-md text-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // 2초 후 메시지 숨김
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const data = {
    labels: ['성과', '비전', '관계', '균형', '복지'],
    datasets: [
      {
        label: '컬쳐핏 진단 결과',
        data: [income, vision, relationship, balance, perks],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          display: false // 눈금 숫자 제거
        },
        max: 40,
        pointLabels: {
          display: true // 포인트 라벨 제거
        }
      }
    },
    plugins: {
      legend: {
        display: false // 범례 제거
      }
    },
    elements: {
      line: {
        borderWidth: 3 // 선 굵기 증가
      }
    }
  };
  const getTopTwoAttributes = () => {
    const attributes = [
      { name: '성과', value: income },
      { name: '비전', value: vision },
      { name: '관계', value: relationship },
      { name: '균형', value: balance },
      { name: '복지', value: perks }
    ];
    
    return attributes.sort((a, b) => b.value - a.value).slice(0, 2);
  };
  
  const getResultDescription = () => {
    const topTwo = getTopTwoAttributes();
    const [first, second] = topTwo;
    
    const consideredAttributes = first.value - second.value <= 1 ? 
      `${first.name}과(와) ${second.name}` : first.name;
  
    switch(consideredAttributes) {
      case '성과':
        return {
          title: "성과의 달인",
          description: "당신은 성과지향적인 문화를 가장 선호합니다. 높은 성과에 따른 보상과 인정을 중요하게 여기며, 도전적인 목표를 달성하는 것에 가치를 둡니다."
        };
      case '비전':
        return {
          title: "미래를 그리는 선구자",
          description: "당신은 회사의 비전과 개인의 성장 기회를 가장 중요하게 여깁니다. 장기적인 발전 가능성과 혁신적인 아이디어를 추구하는 환경에서 더 잘 동기부여될 것 같습니다."
        };
      case '관계':
        return {
          title: "인간관계의 마에스트로",
          description: "당신에게는 동료들과의 좋은 관계가 가장 중요합니다. 협력적이고 지지적인 팀 분위기에서 일할 때 가장 큰 만족감을 느낄 것 같습니다."
        };
      case '균형':
        return {
          title: "워라밸의 고수",
          description: "당신은 일과 삶의 균형을 가장 중요하게 여깁니다. 유연한 근무 환경과 개인 시간을 존중하는 문화에서 더 높은 생산성과 만족도를 보일 것 같습니다."
        };
      case '복지':
        return {
          title: "복지 천국의 주민",
          description: "당신은 회사의 복지와 사내 문화를 가장 중요하게 여깁니다. 직원을 배려하는 다양한 복지 제도가 있는 회사에서 더 큰 소속감과 만족감을 느낄 것 같습니다."
        };
      case '성과과 비전':
        return {
          title: "꿈을 이루는 성과 전문가",
          description: "당신은 성과 지향적이면서도 장기적인 성장을 중요하게 여깁니다. 도전적인 목표와 함께 개인의 발전 기회를 제공하는 환경에서 가장 잘 동기부여될 것 같습니다."
        };
      case '성과과 관계':
        return {
          title: "함께 이루는 성공의 아이콘",
          description: "당신은 높은 성과와 좋은 팀 관계를 모두 중요하게 여깁니다. 협력적인 분위기 속에서 뛰어난 결과를 만들어내는 환경을 선호할 것 같습니다."
        };
      case '성과과 균형':
        return {
          title: "균형 잡힌 성과의 달인",
          description: "당신은 높은 성과를 이루면서도 개인의 삶을 중요하게 여깁니다. 효율적인 업무 환경과 함께 유연한 근무 조건을 제공하는 회사에서 잘 맞을 것 같습니다."
        };
      case '성과과 복지':
        return {
          title: "보상과 혜택의 하모니",
          description: "당신은 높은 성과에 대한 보상과 함께 다양한 복지 혜택을 중요하게 여깁니다. 성과에 따른 인센티브와 포괄적인 복지 제도를 갖춘 회사에서 만족도가 높을 것 같습니다."
        };
      case '비전과 관계':
        return {
          title: "함께 그리는 미래",
          description: "당신은 개인의 성장 기회와 좋은 팀 분위기를 모두 중요하게 여깁니다. 협력적인 문화 속에서 지속적인 학습과 발전이 가능한 환경을 선호할 것 같습니다."
        };
      case '비전과 균형':
        return {
          title: "성장과 여유의 균형자",
          description: "당신은 개인의 성장과 일-삶의 균형을 모두 중요하게 생각합니다. 자기 개발의 기회를 제공하면서도 유연한 근무 환경을 가진 회사에서 잘 맞을 것 같습니다."
        };
      case '비전과 복지':
        return {
          title: "미래를 위한 든든한 지원",
          description: "당신은 장기적인 성장 가능성과 좋은 복지 제도를 모두 중요하게 여깁니다. 개인의 발전을 지원하는 프로그램과 다양한 복지 혜택을 제공하는 회사에서 만족도가 높을 것 같습니다."
        };
      case '관계과 균형':
        return {
          title: "조화로운 일터의 마에스트로",
          description: "당신은 좋은 팀 분위기와 일-삶의 균형을 모두 중요하게 생각합니다. 협력적인 문화와 유연한 근무 조건을 모두 갖춘 환경에서 가장 편안함을 느낄 것 같습니다."
        };
      case '관계과 복지':
        return {
          title: "행복한 일터의 건축가",
          description: "당신은 좋은 동료 관계와 회사의 복지 제도를 모두 중요하게 여깁니다. 팀워크를 중시하면서도 직원들을 배려하는 다양한 복지 프로그램이 있는 회사에서 높은 만족감을 느낄 것 같습니다."
        };
      case '균형과 복지':
        return {
          title: "삶의 질 극대화 전문가",
          description: "당신은 일-삶의 균형과 좋은 복지 제도를 가장 중요하게 생각합니다. 유연한 근무 환경과 함께 다양한 복지 혜택을 제공하는 회사에서 가장 편안하게 일할 수 있을 것 같습니다."
        };
      default:
        return {
          title: "만능 적응형 인재",
          description: "당신의 컬쳐핏은 다양한 요소들이 균형잡힌 모습을 보입니다. 여러 가지 측면에서 유연하게 적응할 수 있는 능력을 가지고 있어, 다양한 기업 문화에서 잘 적응할 수 있을 것 같습니다."
        };
    }
  };

  const result = getResultDescription();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">컬쳐핏 진단 결과</h1>
        
        <section className="m-2">
          <Radar data={data} options={options} className="mb-6"/>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">{result.title}</h2>
            <p>{result.description}</p>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
          </p>
        </section>

        <section className="text-center">
          <p className="text-lg text-left text-gray-700 leading-relaxed font-semibold p-6">
            peerple은 당신과 비슷한 컬쳐핏을 가진 재직자들과 네트워킹 기회를 제공합니다. 가치관과 업무 스타일이 맞는 동료들을 만나 새로운 기회를 발견하고, 함께 성장할 수 있습니다.
          </p>
          <div className="space-y-3">
            <button
              onClick={copyToClipboard}
              className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 border border-indigo-300 rounded-full shadow-sm transition duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              {copySuccess ? '링크가 복사되었습니다!' : '결과 링크 복사하기'}
            </button>
            <a href="/" className="block">
              <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-full shadow-lg transition duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                peerple 알아보기
              </button>
            </a>
          </div>
        </section>
      </div>
      <div className="max-w-2xl mt-8 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">곧 출시됩니다!</h2>
        <p className="text-white text-lg mb-6">
          지금 출시 알림을 신청하고 사전 신청 혜택을 누리세요. peerple 서비스 출시 소식을 가장 먼저 받아보실 수 있습니다.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소를 입력하세요"
            required
            className="flex-grow px-6 py-3 h-14 rounded-full border-1 border-white bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white shadow-md text-lg placeholder-opacity-70"
          />
          <SubmitButton isLoading={isLoading}>
            알림 신청하기
          </SubmitButton>
        </form>
      </div>
    </main>
  )
}

export default QuestionResultPage