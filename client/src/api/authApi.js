import axios from "axios";

const url = "/api/user";

export const register = (data) => axios.post(`${url}/register`, data);

export const login = (data) => axios.post(`${url}/login`, data);
