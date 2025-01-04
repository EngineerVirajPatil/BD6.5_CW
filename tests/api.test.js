import request from "supertest";
import app from "../index.js";
import { app, validateUser, validateBook, validateReview } from "../index.js";

let server;

beforeAll((done) => {
    server = app.listen(3002, () => {
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

jest.setTimeout(50000);

describe("Testing for Validation", () => {
    it("API to create a 201 users object", async () => {
        const response = await request(server).post("/api/users").send({
            name: "Viraj",
            email: "viraj@xyz.com",
        });

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            id: 1,
            name: "Viraj",
            email: "viraj@xyz.com",
        });
    });

    it("API to create a 400 users object", async () => {
        const response = await request(server).post("/api/users").send({
            name: "Viraj",
        });
        expect(response.status).toEqual(400);
        expect(response.text).toEqual("Email is not mentioned or Email is not mentioned in proper format");
    });

    it("API to create a 201 Review object", async () => {
        const response = await request(server).post("/api/reviews").send({
            content: "Viraj",
            userId: 1,
        });

        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            id: 1,
            content: "Viraj",
            userId: 1,
        });
    });

    it("API to create a 400 Review object", async () => {
        const response = await request(server).post("/api/reviews").send({
            userId: 1,
        });

        expect(response.status).toEqual(400);
        expect(response.text).toEqual("content is not mentioned or content is not mentioned in proper format");
    });

    it("API to create a 201 Book object", async () => {
        const response = await request(server).post("/api/books").send({
            title: "Viraj",
            author: "viraj@xyz.com",
        });
        expect(response.status).toEqual(201);
        expect(response.body).toEqual({
            id: 1,
            title: "Viraj",
            author: "viraj@xyz.com",
        });
    });

    it("API to create a 400 Book object", async () => {
        const response = await request(server).post("/api/books").send({
            author: "viraj@xyz.com",
        });
        expect(response.status).toEqual(400);
        expect(response.text).toEqual("title is not mentioned or title is not mentioned in proper format");
    });


    it("test case for function  validateUser", () => {
        const res1 = validateUser({
            id: 1,
            name: "Viraj",
            email: "viraj@xyz.com",
        });
        const res2 = validateUser({
            name: "Viraj",
        });

        expect(res1).toBeNull();

        expect(res2).toEqual("Email is not mentioned or Email is not mentioned in proper format");
    });


    it("test case for function  validateReview", () => {
        const res1 = validateReview({
            content: "Viraj",
            userId: 1,
        });
        const res2 = validateReview({
            userId: 1,
        });

        expect(res1).toBeNull();

        expect(res2).toEqual("content is not mentioned or content is not mentioned in proper format");
    });


    it("test case for function  validateReview", () => {
        const res1 = validateBook({
            id: 1,
            title: "Viraj",
            author: "viraj@xyz.com",
        });
        const res2 = validateBook({
            author: "viraj@xyz.com",
        });

        expect(res1).toBeNull();

        expect(res2).toEqual("title is not mentioned or title is not mentioned in proper format");
    });


});
