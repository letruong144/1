
export interface Question {
  id: number;
  section: 'Ngữ Pháp và Từ Vựng' | 'Phát Âm';
  question: string;
  options: { [key: string]: string };
  answer: string;
}

export type UserAnswers = {
  [key: number]: string;
};
