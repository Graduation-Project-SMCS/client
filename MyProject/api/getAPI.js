import axios from "axios";
const getAPI = async (params, end_url, token) => {
    const config = {
        params: params,
        headers: {
            "Content-type": "text/plain;charset=UTF-8",
        },
    };
    // if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return await axios.get("https://wuga-server.herokuapp.com" + end_url, config);
};

export default getAPI;