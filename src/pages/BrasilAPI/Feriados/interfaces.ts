export interface HolydayForm {
  year: string;
}

export interface Holyday {
  date: string;
  name: string;
  type: string;
}

export interface HolydayErrorResponse {
  name: string;
  message: string;
  type: string;
}