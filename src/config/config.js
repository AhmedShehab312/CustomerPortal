const ENDPOINT = "http://18.157.186.202:3000/";

const TIMEOUT = 120000;

export default class ConfigClass {

    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }


}

