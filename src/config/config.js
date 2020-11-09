const ENDPOINT = "http://52.29.158.36:3000/";

const TIMEOUT = 120000;

export default class ConfigClass {

    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }


}

