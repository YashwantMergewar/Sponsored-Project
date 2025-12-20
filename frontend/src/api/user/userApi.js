import api from '../setupAxios.js';

const createUser = async (data) => {
    try {
        const res = await api.post('/users/register', data);
        return res.data;
    } catch (error) {
        // Normalize server-side error message and rethrow so callers can handle it
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Registration failed');
    }
}


const loginUser = async (data) => {
    try {
        const res = await api.post('/users/login', data);
        return res.data
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Login failed');
    }
}

export {
    createUser,
    loginUser
}