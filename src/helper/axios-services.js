const axios = require('axios');

const AxiosServices = {
    fetchData: async (url) => {
        try {
            const response = await axios(url);
            return new Promise((resolve, reject) => {
                if (response.status === 200) resolve(response);
                reject(response);
            });
        } catch (error) {
            let new_error = {}
            if (error.isAxiosError) {
                new_error = {
                    message: 'An unexpected error occurred',
                    details: error.toString()
                }
            } else {
                new_error = {
                    message: 'An unexpected error occurred',
                    details: error.toString()
                }
            }
            throw {
                ...new_error
            };
        }
    }
};

module.exports = { AxiosServices }