import { Suspense } from "react";

const QuestionResultLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

export default QuestionResultLayout