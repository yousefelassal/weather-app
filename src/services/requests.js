import axios from 'axios';
const baseUrl = 'http://localhost:3001/profile';

const getProfile = async () => {
    const response = await axios.get(baseUrl);
    console.log(response.data)
    return response.data;
}

const updateProfile = async (newProfile) => {
    const response = await axios.put(baseUrl, newProfile);
    return response.data;
}

export default { getProfile, updateProfile };