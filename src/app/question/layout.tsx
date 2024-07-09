import { Metadata } from "next";

export const metadata: Metadata = {
  title: "컬쳐핏 진단 테스트",
  description: "컬쳐핏 진단 테스트는 당신의 가치관, 선호도, 행동 패턴을 분석하여 어떤 기업 문화를 선호하는지 알아봅니다.",
};

const QuestionLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full">{children}</div>
}

export default QuestionLayout