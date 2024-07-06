"use client"

import { useSearchParams } from "next/navigation"
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const QuestionResultPage = () => {
  const searchParams = useSearchParams()
 
  const income = Number(searchParams.get('i') || 0);
  const vision = Number(searchParams.get('v') || 0);
  const relationship = Number(searchParams.get('r') || 0);
  const balance = Number(searchParams.get('b') || 0);
  const perks = Number(searchParams.get('p') || 0);

  const data = {
    labels: ['성과', '비전', '관계', '균형', '복지'],
    datasets: [
      {
        label: '나의 컬쳐핏',
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

  return (
    <main className="p-2 flex flex-col items-center">
      
      <section className="p-10">
        <p>나의 컬쳐핏은 다음과 같습니다.</p>
        
        <Radar data={data} options={options} />

        <p>
          당신은 ~~~~~~입니다.
        </p>
      </section>

      <section>
        <button className="w-full border border-black p-1 mt-1">결과 공유하기</button>
        <button className="w-full border border-black p-1 mt-1">peerple 알아보기</button>
      </section>
    </main>
  )
}

export default QuestionResultPage