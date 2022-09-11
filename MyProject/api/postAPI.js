import axios from "axios";
const postAPI = async (data, end_url, token) => {
    const config = {
        headers: {
            "Content-type": "application/json;charset=UTF-8",
        },
    };
    // if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    // }
    console.log(data)
    return await axios.post("https://wuga-server.herokuapp.com" + end_url, data, config);
};

export default postAPI;