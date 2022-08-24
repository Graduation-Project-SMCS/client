import axios from "axios";
const postAPI = async (data, end_url, token) => {
    const config = {
        headers: {
            "Content-type": "text/plain;charset=UTF-8",
        },
    };
    // if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return await axios.post("https://wuga-server.herokuapp.com" + end_url, data, config);
};

export default postAPI;