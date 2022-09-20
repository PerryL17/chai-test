const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
chai.should();

describe("People", () => {
  describe("post /api/v1/people", () => {
    it("should not create a people entry without a name", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ age: 10 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.eql({ error: "Please enter a name." });
          done();
        });
    });
    it("should create a people entry with valid input", (done) => {
      chai
        .request(app)
        .post("/api/v1/people")
        .send({ name: "Tom", age: 15 })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.eql({ message: "A person record was added." });
          done();
        });
    });
  });
  describe("get /api/v1/people", () => {
    it("should return an array of person entries of length 1", (done) => {
      chai
        .request(app)
        .get("/api/v1/people")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.length(1);
          done();
        });
    });
  });
  describe("get /apl/v1/people/:id", () => {
    it("should return the entry corresponding to person[0]", (done) => {
      chai
        .request(app)
        .get("/api/v1/people/0")
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          res.body.name.should.be.eql("Tom");
        });
      done();
    });
    it("should return an error if the index is >= the length of the array", (done) => {
      chai
        .request(app)
        .get("/api/v1/people/3")
        .end((err, res) => {
          res.should.have.status(404);
        });
      done();
    });
  });
});
