import User from '@models/User';

export default function ({ $axios, $config, redirect, $toast }, inject) {
    const api = $axios.create();

    $axios.onError(error => {
        const data = error.response.data;
        const message = data.message;
        if(message) {
            $toast.error(message);
        }
    })

    api.onRequest(config => {
        const token = User.getToken();
        config.headers.Authorization = "Bearer " + token;
    });

    api.onError(error => {
        const data = error.response.data;
        const message = data.message;
        if(message) {
            $toast.error(message);
        }
    })

    inject('api', api);
}
