import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 서버 URL

axios.defaults.withCredentials = true; // 쿠키 인증 사용

// 계약 저장
export const saveContract = async (contractData: any) => {
  const response = await axios.post(`${API_BASE_URL}/contract/save`, contractData);
  return response.data;
};

// 계약 목록 조회
export const getContractsByStatus = async (status?: string) => {
  const response = await axios.get(`${API_BASE_URL}/contracts/`, {
    params: { status },
  });
  return response.data;
};

// 계약 상태 리스트 조회
export const getContractStatusList = async () => {
  const response = await axios.get(`${API_BASE_URL}/contracts/status_list`);
  return response.data;
};

// 특정 게임 ID로 계약 조회
export const getContractByGameId = async (gameId: string) => {
  const response = await axios.get(`${API_BASE_URL}/contract/${gameId}`);
  return response.data;
};
