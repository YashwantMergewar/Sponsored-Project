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
        throw new Error(error.message || 'Failed to fetch all voters details');
    }
}

const getVoterById = async (voter_id) => {
    try {
        const res = await api.get(`/voters/get-voters/${voter_id}`);
        return res.data
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
            
        }
        throw new Error(error.message || 'Failed to fetch voters details');
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

const updateVoter = async (voter_id, data) => {
    try {
        const res = await api.patch(`/voters/update-voter/${voter_id}`, data)
        return res.data;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        console.log(error.message);
        throw new Error(error.message || 'Failed to update voter');
    }
}

export {
    registerVoter,
    getAllVoterDetails,
    deleteVoterDetails,
    getVoterById,
    updateVoter
    
}
