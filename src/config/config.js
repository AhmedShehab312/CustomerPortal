const ENDPOINT = "http://139.59.152.220:3000/";
const ENDPOINTGraph = "https://03ce97055263.ngrok.io/";

const TIMEOUT = 120000;

export default class ConfigClass {

    static get getEndpoint() {
            return ENDPOINT;
    }

    static get getEndpointGraph() {
        return ENDPOINTGraph;
}

    static get getTimeout() {
        return TIMEOUT;
    }


}

