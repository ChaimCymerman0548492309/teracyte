export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type ImagePayload = {
  image_id: string;
  timestamp?: string;
  image_data_base64: string;
};

export type ResultsPayload = {
  image_id: string;
  intensity_average: number;
  focus_score: number;
  classification_label: string;
  histogram: number[];
};
