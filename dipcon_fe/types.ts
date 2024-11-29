export interface CustomCondition {
  banned_keywords: string[];
  no_spoilers: boolean;
  monetization_allowed: boolean;
  no_bgm_usage: boolean;
  no_violent_content: boolean;
}

export interface ContractData {
  title: string;
  streamer_id: string;
  game_id: string;
  min_broadcast_length: number;
  max_broadcast_length: number;
  isfree: boolean;
  custom_conditions?: CustomCondition;
  streamer_signed: boolean;
  developer_signed: boolean;
  status: string;
  last_updated: string;
}

export interface GameMonetizedStatus {
  gameID: string;
  isFree: boolean;
}

export interface RevenueData {
  gameID: string;
  startDate: string;
  endDate: string;
  dateUnit: string;
  subtotal: Array<Record<string, number>>;
  total: number;
}

export interface GamePlayCount extends RevenueData {}

export interface GameTags {
  gameID: string;
  tags: string[];
} 