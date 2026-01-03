import api from './../setupAxios.js';

const registerVoter = async (data) => {
    try {
        const res = await api.post('/voters/register-voter', data)
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message || 'Registration failed');
    }
}

const getAllVoterDetails = async () => {
    try {
        const res = await api.get('/voters/get-voters')
        return res.data
    }catch(error){
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Registration failed');
    }
}

const deleteVoterDetails = async (voterId) => {
    try {
        const res = await api.delete(`/voters/delete-voter/${voterId}`)
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Deletion failed');
    }
}

export {
    registerVoter,
    getAllVoterDetails,
    deleteVoterDetails
}
