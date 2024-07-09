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
  
  const getMaxAttribute = () => {
    const attributes = [
      { name: '성과', value: income },
      { name: '비전', value: vision },
      { name: '관계', value: relationship },
      { name: '균형', value: balance },
      { name: '복지', value: perks }
    ];
    
    const maxAttr = attributes.reduce((max, attr) => attr.value > max.value ? attr : max);
    const minAttr = attributes.reduce((min, attr) => attr.value < min.value ? attr : min);
    
    // 최대값과 최소값의 차이가 1 이하인 경우 'balanced'를 반환
    if (maxAttr.value - minAttr.value <= 1) {
      return { name: 'balanced', value: maxAttr.value };
    }
    
    return maxAttr;
  };
  
  const getResultDescription = () => {
    const maxAttribute = getMaxAttribute();
    
    switch(maxAttribute.name) {
      case '성과':
        return "당신은 성과 지향적인 문화를 선호합니다. 높은 성과에 따른 보상과 인정을 중요하게 여기며, 도전적인 목표를 달성하는 것에 가치를 둡니다.";
      case '비전':
        return "당신은 회사의 비전과 개인의 성장 기회를 중요하게 여깁니다. 장기적인 발전 가능성과 혁신적인 아이디어를 추구하는 환경에서 더 잘 동기부여될 것 같습니다.";
      case '관계':
        return "당신에게는 동료들과의 좋은 관계가 중요합니다. 협력적이고 지지적인 팀 분위기에서 일할 때 가장 큰 만족감을 느낄 것 같습니다.";
      case '균형':
        return "당신은 일과 삶의 균형을 중요하게 여깁니다. 유연한 근무 환경과 개인 시간을 존중하는 문화에서 더 높은 생산성과 만족도를 보일 것 같습니다.";
      case '복지':
        return "당신은 회사의 복지와 사내 문화를 중요하게 여깁니다. 직원을 배려하는 다양한 복지 제도가 있는 회사에서 더 큰 소속감과 만족감을 느낄 것 같습니다.";
      case 'balanced':
      default:
        return "당신의 컬쳐핏은 다양한 요소들이 균형잡힌 모습을 보입니다. 다양한 환경에서 잘 적응할 수 있을 것 같습니다.";
    }
  };

  const maxAttribute = getMaxAttribute();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">컬쳐핏 진단 결과</h1>
        
        <section className="m-20">
          <Radar data={data} options={options} className="mb-6"/>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {getResultDescription()}
          </p>
        </section>

        <section className="text-center">
          <p className="text-lg text-left text-gray-700 leading-relaxed font-semibold p-8">
            peerple은 당신과 비슷한 컬쳐핏을 가진 재직자들과 네트워킹 기회를 제공합니다. 가치관과 업무 스타일이 맞는 동료들을 만나 새로운 기회를 발견하고, 함께 성장할 수 있습니다.
          </p>
          <section className="space-y-3">
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
        </section>
        </section>
      </div>
    </main>
  )
}

export default QuestionResultPage