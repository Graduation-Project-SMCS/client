import axios from "axios";
const putAPI = async (data, end_url, token) => {
    const config = {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
        },
    };
    // if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return await axios.put("https://wuga-server.herokuapp.com" + end_url, data, config);
};

export default putAPI;