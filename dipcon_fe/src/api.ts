import axios from "axios";

// API 기본 URL을 백엔드 서버 주소로 설정
const API_BASE_URL = "http://180.210.82.162";

// axios 인스턴스
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

// 인터셉터 추가
axiosInstance.interceptors.request.use((config) => {
    // 요청에 공통적으로 추가할 헤더나 로깅
    return config;
});

interface CustomCondition {
  banned_keywords: string[];
  no_spoilers: boolean;
  monetization_allowed: boolean;
  no_bgm_usage: boolean;
  no_violent_content: boolean;
}

interface ContractData {
  title: string;
  streamer_id: string;
  game_id: string;
  min_broadcast_length: number;
  max_broadcast_length: number;
  isfree: boolean;
  custom_conditions?: CustomCondition;  // Optional 필드
  streamer_signed?: boolean;
  developer_signed?: boolean;
  status?: string;
  last_updated?: string;  // datetime은 string으로 전송
}

// API 함수들
const getContractsByStatus = async (status?: string) => {
  try {
    const response = await axiosInstance.get('/contracts/', { params: { status } });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('계약 목록 조회 실패:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      throw new Error(
        error.response?.data?.detail || 
        '계약 목록을 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    }
    throw error;
  }
};

const saveContract = async (contractData: ContractData) => {
  try {
    const formattedData = {
      title: contractData.title,
      streamer_id: contractData.streamer_id,
      game_id: contractData.game_id,
      min_broadcast_length: contractData.min_broadcast_length,
      max_broadcast_length: contractData.max_broadcast_length,
      isfree: contractData.isfree,
      custom_conditions: contractData.custom_conditions
    };

    console.log('전송할 데이터:', formattedData);  // 디버깅용
    const response = await axiosInstance.post('/contract/save', formattedData);
    return response.data;
  } catch (error) {
    console.error('계약 저장 오류:', error);
    throw error;
  }
};

const getContractStatusList = async () => {
  try {
    const response = await axiosInstance.get('/contracts/status_list');
    return response.data;
  } catch (error) {
    console.error("계약 상태 리스트 조회 실패:", error);
    throw error;
  }
};

const getContractByGameId = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`/getcontract/${gameId}`); // 경로 대소문자 확인
    return response.data;
  } catch (error) {
    console.error("특정 게임 ID로 계약 조회 실패:", error);
    throw error;
  }
};

// 게임 정보를 가져오는 API 함수 추가
const getGameInfo = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`/game/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("게임 정보 조회 실패:", error);
    throw error;
  }
};

const getGameMonetizedStatus = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`/MonetizedGame?game_id=${gameId}`);
    return response.data.data;
  } catch (error) {
    console.error("게임 수익화 상태 조회 실패:", error);
    // 기본값 반환
    return {
      gameID: gameId,
      isFree: true  // 또는 적절한 기본값
    };
  }
};

const getGameTags = async (gameId: string) => {
  try {
    const response = await axiosInstance.get(`/FetchModTags?game_id=${gameId}`); 
    return response.data.data;
  } catch (error) {
    console.error("게임 태그 조회 실패:", error);
    throw error;
  }
};

const signContract = async (contractId: number, signerType: 'streamer' | 'developer') => {
  try {
    const response = await axiosInstance.post(`/contract/sign/${contractId}?signer_type=${signerType}`);
    return response.data;
  } catch (error) {
    console.error('계약 서명 실패:', error);
    throw error;
  }
};

const rejectContract = async (contractId: number, reason: string) => {
  try {
    const response = await axiosInstance.post(`/contract/reject/${contractId}`, { reason });
    return response.data;
  } catch (error) {
    console.error('계약 거절 실패:', error);
    throw error;
  }
};

const requestContractModification = async (contractId: number, modification: any) => {
  try {
    const response = await axiosInstance.post(`/contract/modify/${contractId}`, modification);
    return response.data;
  } catch (error) {
    console.error('계약 수정 요청 실패:', error);
    throw error;
  }
};

// 게임 수익 데이터를 가져오는 함수 추가
const getGameRevenue = async (gameId: string, startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.post('/GameRevenue', {
      method: "GET",
      gameID: gameId,
      date: {
        startDate,
        endDate
      },
      dateUnit: 1
    });
    return response.data;
  } catch (error) {
    console.error("게임 수익 데이터 조회 실패:", error);
    return {
      status_code: 200,
      data: {
        gameID: gameId,
        startDate,
        endDate,
        dateUnit: "(단위: 월)",
        subtotal: [],
        total: 0
      }
    };
  }
};

// 게임 플레이 카운트를 가져오는 함수 추가
const getGamePlayCount = async (gameId: string, startDate: string, endDate: string) => {
  try {
    const response = await axiosInstance.post('/GamePlayCount', {
      method: "GET",
      gameID: gameId,
      date: {
        startDate,
        endDate
      },
      dateUnit: 1
    });
    return response.data;
  } catch (error) {
    console.error("게임 플레이 카운트 조회 실패:", error);
    // 에러 발생 시 기본값 반환
    return {
      status_code: 200,
      data: {
        gameID: gameId,
        startDate,
        endDate,
        dateUnit: "(단위: 월)",
        subtotal: [],
        total: 0
      }
    };
  }
};

// 일반적인 GET 요청을 위한 함수 추가
const get = async (url: string) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(`GET 요청 실패 (${url}):`, error);
    throw error;
  }
};

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;

// 모든 함수들을 객체로 묶어서 export 
export {
  get,  // 추가
  getContractsByStatus as getContracts, // 중복 제거
  saveContract,
  getContractStatusList,
  getContractByGameId,
  getGameMonetizedStatus,
  getGameInfo,
  getGameTags,
  signContract,
  rejectContract,
  requestContractModification,
  getGameRevenue,
  getGamePlayCount
};

