import axios from "axios";
const deleteAPI = async (params, end_url, token) => {
    const config = {
        params: params,
        headers: {
            "Content-type": "text/plain;charset=UTF-8",
        },
    };
    // if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return await axios.delete("https://wuga-server.herokuapp.com" + end_url, config);
};

export default deleteAPI;