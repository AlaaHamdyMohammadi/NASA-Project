const request = require('supertest');
const app = require('../../app');


describe('Test GET / launches', () => {
    test('It should respond with 200 success', async () => {
        const res = await request(app).get('/launches').expect(200);
        //expect(res.statusCode).toBe(200); // Assersion statement
    })
});
describe('Test Post / launch', () => {
    const launchData = {
      mission: "USS Enterprice",
      rocket: "NCC",
      target: "Kepler",
      launchDate: "May 4, 2025",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprice",
      rocket: "NCC",
      target: "Kepler",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprice",
      rocket: "NCC",
      target: "Kepler",
      launchDate: "hello",
    };

    test("It should respond with 201 created", async () => {
        const res = await request(app)
          .post("/launches")
          .send(launchData)
          .expect(201);

        const reqDate = new Date (launchData.launchDate).valueOf();
        const resDate = new Date(res.body.launchDate).valueOf();
        expect(resDate).toBe(reqDate)

        expect(res.body).toMatchObject(
          launchDataWithoutDate
        );
    });
    test("It should catch missing required properties", async () => {
         const res = await request(app)
           .post("/launches")
           .send(launchDataWithoutDate)
           .expect(400);

        expect(res.body).toStrictEqual({ status: "Faild launch" });   
    });
    test("It should catch invalid dates", async () => {
        const res = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect(400);

        expect(res.body).toStrictEqual({ status: "Faild Date" });   
    });
});