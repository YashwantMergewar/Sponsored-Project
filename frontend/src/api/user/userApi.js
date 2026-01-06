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

const deleteUser = async () => {
    try {
        const res = await api.delete('/users/delete-user')
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Account deletion failed');
    }
}

const updateUser = async (data) => {
    try {
        const res = await api.patch('/users/profile/update-user', data);
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        console.log(error.response);
        throw new Error(error.message || 'Profile updation failed');
    }
}

const changeUserPassword = async (data) => {
    try {
        const res = await api.patch('/users/change-password', data)
        res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message || 'Profile updation failed');
    }
}

export {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    changeUserPassword

}