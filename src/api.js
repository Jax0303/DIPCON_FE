// frontend/src/api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001'; // 백엔드 서버 URL

// 사용자 등록
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// 사용자 목록 조회
export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// 로그인
export const login = async (username, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/login`, 
            { username, password }, 
            { withCredentials: true }  // 쿠키 전송을 위한 옵션 추가
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// 비밀번호 재설정 요청
export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/request-password-reset`, { email });
        return response.data;
    } catch (error) {
        console.error('Error requesting password reset:', error);
        throw error;
    }
};

// 비밀번호 재설정
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(`${BASE_URL}/reset-password`, { token, new_password: newPassword });
        return response.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};

// 계약 저장
export const saveContract = async (contractData) => {
    try {
        const response = await axios.post(`${BASE_URL}/contract/save`, contractData);
        return response.data;
    } catch (error) {
        console.error('Error saving contract:', error);
        throw error;
    }
};

// 특정 게임 ID로 계약 조회
export const getContractByGameId = async (gameId) => {
    try {
        const response = await axios.get(`${BASE_URL}/contract/${gameId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching contract by game ID:', error);
        throw error;
    }
};

// 계약 조건 확인
export const checkContract = async (broadcastData) => {
    try {
        const response = await axios.post(`${BASE_URL}/check_contract`, broadcastData);
        return response.data;
    } catch (error) {
        console.error('Error checking contract:', error);
        throw error;
    }
};

// 커스텀 조건 업로드
export const uploadCustomCondition = async (content) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload-customcondition`, { content });
        return response.data;
    } catch (error) {
        console.error('Error uploading custom condition:', error);
        throw error;
    }
};

// 커스텀 조건 조회
export const getCustomCondition = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customcondition`);
        return response.data;
    } catch (error) {
        console.error('Error fetching custom condition:', error);
        throw error;
    }
};

// 계약 상태 업데이트
export const updateContractStatus = async (contractId, status) => {
    try {
        const response = await axios.patch(`${BASE_URL}/contract/${contractId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating contract status:', error);
        throw error;
    }
};

// 상태별 계약 목록 조회
export const getContractsByStatus = async (status) => {
    try {
        const response = await axios.get(`${BASE_URL}/contracts/`, { params: { status } });
        return response.data;
    } catch (error) {
        console.error('Error fetching contracts by status:', error);
        throw error;
    }
};

// 계약 상태 목록 조회
export const getContractStatusList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/contracts/status_list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching contract status list:', error);
        throw error;
    }
};
