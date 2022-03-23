const Service = require('./service.js');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json'),
}

;

(async() => {

    // This request goes to the internet, we need to avoid that
    {
        /*
            const service = new Service();
            const noStub = await service.makeRequest(BASE_URL_1);
            console.log(JSON.stringify(noStub));
        */
    }

    // Working with stubs
    {
        // create service and stub
        const service = new Service();
        const stub = sinon.stub(service, service.makeRequest.name);

        //setup stubs for each endpoint
        stub
            .withArgs(BASE_URL_1)
            .resolves(mocks.tatooine);

        stub
            .withArgs(BASE_URL_2)
            .resolves(mocks.alderaan);

        // Test with BASE_URL_1
        {
            const expected = {
                "name": "Tatooine",
                "surfaceWater": "1",
                "appearedIn": 5
            };

            const result = await service.getPlanets(BASE_URL_1);
            deepStrictEqual(result, expected);
        }

        // Test with BASE_URL_2
        {
            const expected = {
                "name": "Alderaan",
                "surfaceWater": "40",
                "appearedIn": 2
            };

            const result = await service.getPlanets(BASE_URL_2);
            deepStrictEqual(result, expected);
        }
    }
})();