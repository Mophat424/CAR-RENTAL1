// import request from "supertest";
// import app from "../../src/index"; 
// import db from "../../src/Drizzle/db";
// import { LocationTable } from "../../src/Drizzle/schema";

// beforeEach(async () => {
//   await db.delete(LocationTable); // Reset the location table before each test
// });

// describe("Location Integration Tests", () => {
//   describe("POST /location", () => {
//     it("should create a location", async () => {
//       const res = await request(app).post("/location").send({
//         locationName: "Nairobi",
//         address: "123 Nairobi St",
//         contactNumber: "0712345678",
//       });

//       expect(res.status).toBe(201);
//       expect(res.body.message).toBe("Location created successfully");
//     });

//     it("should return 500 if service throws error", async () => {
//       const original = db.insert;
//       db.insert = () => { throw new Error("DB error") };

//       const res = await request(app).post("/location").send({
//         locationName: "Fail",
//         address: "Nowhere",
//         contactNumber: "0000000000",
//       });

//       expect(res.status).toBe(500);
//       expect(res.body.message).toBe("DB error");

//       db.insert = original; // Restore
//     });
//   });

//   describe("GET /location", () => {
//     it("should retrieve all locations", async () => {
//       await db.insert(LocationTable).values({ locationName: "Mombasa", address: "Beach Rd" });

//       const res = await request(app).get("/location");

//       expect(res.status).toBe(200);
//       expect(res.body.locations.length).toBeGreaterThan(0);
//     });

//     it("should return 404 if no locations exist", async () => {
//       const res = await request(app).get("/location");
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("No locations found");
//     });

//     it("should handle internal server error", async () => {
//       const original = db.query.LocationTable.findMany;
//       // @ts-ignore
//       db.query.LocationTable.findMany = () => { throw new Error("Failure") };

//       const res = await request(app).get("/location");
//       expect(res.status).toBe(500);
//       expect(res.body.message).toBe("Internal server error");

//       db.query.LocationTable.findMany = original;
//     });
//   });

//   describe("GET /location/:id", () => {
//     it("should get a location by ID", async () => {
//       const [loc] = await db.insert(LocationTable)
//         .values({ locationName: "Kisumu", address: "Kisumu Rd" })
//         .returning();

//       const res = await request(app).get(`/location/${loc.locationID}`);
//       expect(res.status).toBe(200);
//       expect(res.body.location.locationName).toBe("Kisumu");
//     });

//     it("should return 400 for invalid ID", async () => {
//       const res = await request(app).get("/location/abc");
//       expect(res.status).toBe(400);
//       expect(res.body.message).toBe("Invalid location ID");
//     });

//     it("should return 404 if not found", async () => {
//       const res = await request(app).get("/location/99999");
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("Location not found");
//     });

//     it("should handle internal server error", async () => {
//       const original = db.query.LocationTable.findFirst;
//       // @ts-ignore
//       db.query.LocationTable.findFirst = () => { throw new Error("Failure") };

//       const res = await request(app).get("/location/1");
//       expect(res.status).toBe(500);
//       expect(res.body.message).toBe("Internal server error");

//       db.query.LocationTable.findFirst = original;
//     });
//   });

//   describe("PUT /location/:id", () => {
//     it("should update a location", async () => {
//       const [loc] = await db.insert(LocationTable)
//         .values({ locationName: "Eldoret", address: "Uasin Gishu" })
//         .returning();

//       const res = await request(app)
//         .put(`/location/${loc.locationID}`)
//         .send({ locationName: "Eldoret Town", address: "Updated Address" });

//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe("Location updated successfully");
//     });

//     it("should return 404 for invalid ID", async () => {
//       const res = await request(app).put("/location/abc").send({});
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("Invalid location ID");
//     });

//     it("should return 404 if location not found", async () => {
//       const res = await request(app).put("/location/9999").send({
//         locationName: "Ghost Town", address: "Nowhere"
//       });
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("Location not found");
//     });

//     it("should handle internal error", async () => {
//       const [loc] = await db.insert(LocationTable)
//         .values({ locationName: "Temp", address: "Test" })
//         .returning();

//       const spy = jest.spyOn(db, "update").mockImplementation(() => {
//         throw new Error("Crash");
//       });

//       const res = await request(app).put(`/location/${loc.locationID}`).send({
//         locationName: "Crash",
//         address: "Error"
//       });

//       expect(res.status).toBe(500);
//       expect(res.body.message).toBe("Internal server error");

//       spy.mockRestore();
//     });
//   });

//   describe("DELETE /location/:id", () => {
//     it("should delete a location", async () => {
//       const [loc] = await db.insert(LocationTable)
//         .values({ locationName: "DeleteMe", address: "Bye" })
//         .returning();

//       const res = await request(app).delete(`/location/${loc.locationID}`);
//       expect(res.status).toBe(200);
//       expect(res.body.message).toBe("Location deleted successfully");
//     });

//     it("should return 404 for invalid ID", async () => {
//       const res = await request(app).delete("/location/abc");
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("Invalid location ID");
//     });

//     it("should return 404 if location not found", async () => {
//       const res = await request(app).delete("/location/9999");
//       expect(res.status).toBe(404);
//       expect(res.body.message).toBe("Location not found");
//     });

//     it("should handle internal error", async () => {
//       const [loc] = await db.insert(LocationTable)
//         .values({ locationName: "ToDelete", address: "Boom" })
//         .returning();

//       const spy = jest.spyOn(db, "delete").mockImplementation(() => {
//         throw new Error("Fail");
//       });

//       const res = await request(app).delete(`/location/${loc.locationID}`);

//       expect(res.status).toBe(500);
//       expect(res.body.message).toBe("Internal server error");

//       spy.mockRestore();
//     });
//   });
// });






import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import { LocationTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

beforeEach(async () => {
  await db.delete(LocationTable);
});

afterEach(async () => {
  await db.delete(LocationTable);
});

describe("Location Integration Tests", () => {
  describe("POST /location", () => {
    it("creates a new location successfully", async () => {
      const res = await request(app).post("/location").send({
        locationName: "Nairobi",
        address: "123 Nairobi St",
        contactNumber: "0712345678",
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Location created successfully");
    });

    it("returns 400 when required fields are missing", async () => {
      const res = await request(app).post("/location").send({ locationName: "" });
      expect(res.status).toBe(400);
    });

    it("returns 500 if database insert throws an error", async () => {
      const spy = jest.spyOn(db, "insert").mockImplementation(() => {
        throw new Error("DB error");
      });

      const res = await request(app).post("/location").send({
        locationName: "Fail",
        address: "Nowhere",
        contactNumber: "0000000000",
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("DB error");

      spy.mockRestore();
    });
  });

  describe("GET /location", () => {
    it("retrieves all available locations", async () => {
      await db.insert(LocationTable).values({
        locationName: "Mombasa",
        address: "Beach Rd",
        contactNumber: "0711000000"
      });

      const res = await request(app).get("/location");

      expect(res.status).toBe(200);
      expect(res.body.locations.length).toBeGreaterThan(0);
    });

    it("returns 404 when no locations exist", async () => {
      const res = await request(app).get("/location");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("No locations found");
    });

    it("returns 500 when fetching all locations fails", async () => {
      const spy = jest
        .spyOn(db.query.LocationTable, "findMany")
        .mockImplementation(() => {
          throw new Error("Failure");
        });

      const res = await request(app).get("/location");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal server error");

      spy.mockRestore();
    });
  });

  describe("GET /location/:id", () => {
    it("retrieves a location by ID", async () => {
      const [loc] = await db.insert(LocationTable)
        .values({ locationName: "Kisumu", address: "Kisumu Rd", contactNumber: "0722000000" })
        .returning();

      const res = await request(app).get(`/location/${loc.locationID}`);
      expect(res.status).toBe(200);
      expect(res.body.location.locationName).toBe("Kisumu");
    });

    it("returns 400 when ID is not a valid number", async () => {
      const res = await request(app).get("/location/abc");
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Invalid location ID");
    });

    it("returns 404 when location with given ID does not exist", async () => {
      const res = await request(app).get("/location/99999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Location not found");
    });

    it("returns 500 when getting location by ID fails", async () => {
      const spy = jest
        .spyOn(db.query.LocationTable, "findFirst")
        .mockImplementation(() => {
          throw new Error("Failure");
        });

      const res = await request(app).get("/location/1");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal server error");

      spy.mockRestore();
    });
  });

  describe("PUT /location/:id", () => {
    it("updates an existing location successfully", async () => {
      const [loc] = await db.insert(LocationTable)
        .values({ locationName: "Eldoret", address: "Uasin Gishu", contactNumber: "0744000000" })
        .returning();

      const res = await request(app)
        .put(`/location/${loc.locationID}`)
        .send({ locationName: "Eldoret Town", address: "Updated Address" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Location updated successfully");
    });

    it("returns 404 for invalid location ID format", async () => {
      const res = await request(app).put("/location/abc").send({});
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Invalid location ID");
    });

    it("returns 404 when updating a non-existent location", async () => {
      const res = await request(app).put("/location/9999").send({
        locationName: "Ghost Town", address: "Nowhere"
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Location not found");
    });

    it("returns 500 when update operation throws an error", async () => {
      const [loc] = await db.insert(LocationTable)
        .values({ locationName: "Temp", address: "Test", contactNumber: "0744999999" })
        .returning();

      const spy = jest.spyOn(db, "update").mockImplementation(() => {
        throw new Error("Crash");
      });

      const res = await request(app).put(`/location/${loc.locationID}`).send({
        locationName: "Crash",
        address: "Error"
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal server error");

      spy.mockRestore();
    });
  });

  describe("DELETE /location/:id", () => {
    it("deletes a location successfully", async () => {
      const [loc] = await db.insert(LocationTable)
        .values({ locationName: "DeleteMe", address: "Bye", contactNumber: "0755000000" })
        .returning();

      const res = await request(app).delete(`/location/${loc.locationID}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Location deleted successfully");
    });

    it("returns 404 when deleting with invalid ID format", async () => {
      const res = await request(app).delete("/location/abc");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Invalid location ID");
    });

    it("returns 404 when trying to delete a non-existent location", async () => {
      const res = await request(app).delete("/location/9999");
      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Location not found");
    });

    it("returns 500 when delete operation throws an error", async () => {
      const [loc] = await db.insert(LocationTable)
        .values({ locationName: "ToDelete", address: "Boom", contactNumber: "0799999999" })
        .returning();

      const spy = jest.spyOn(db, "delete").mockImplementation(() => {
        throw new Error("Fail");
      });

      const res = await request(app).delete(`/location/${loc.locationID}`);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal server error");

      spy.mockRestore();
    });
  });
});
