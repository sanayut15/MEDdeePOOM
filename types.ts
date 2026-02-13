
export interface MembershipFormData {
  name: string;
  lastname: string;
  agreed: boolean;
}

export enum Language {
  TH = 'TH',
  EN = 'EN'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
