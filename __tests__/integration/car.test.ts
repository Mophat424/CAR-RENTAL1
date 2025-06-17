import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import drizzle from "../../src/Drizzle/db";
import { CarTable, LocationTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

let testLocationId: number;
let carId: number;

beforeAll(async () => {
  // Insert a test location to associate cars with
  const [location] = await drizzle.insert(LocationTable).values({
    locationName: "Nairobi Branch",
    address: "123 CBD, Nairobi",
    contactNumber: "0712345678",
  }).returning();

  testLocationId = location.locationID;
});

afterAll(async () => {
  // Clean up inserted records after tests
  await drizzle.delete(CarTable);
  await drizzle.delete(LocationTable);
  await db.$client.end();
});

describe("Car Integration Routes", () => {
  it("should create a car successfully", async () => {
    const res = await request(app).post("/car").send({
      carModel: "Toyota Corolla",
      year: "2022-01-01",
      color: "White",
      rentalRate: "4500.00",
      availability: true,
      locationID: testLocationId,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Car created successfully");

    const [car] = await drizzle
      .select()
      .from(CarTable)
      .where(eq(CarTable.carModel, "Toyota Corolla"));

    carId = car.carID;
  });

  it("should fail to create a car with missing required fields", async () => {
    const res = await request(app).post("/car").send({
      color: "White",
      availability: true,
      locationID: testLocationId,
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBeDefined();
  });

  it("should return a list of cars", async () => {
    const res = await request(app).get("/car");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.cars)).toBe(true);
    expect(res.body.cars.length).toBeGreaterThan(0);
  });

  it("should return a car by valid ID", async () => {
    const res = await request(app).get(`/car/${carId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.car.carID).toBe(carId);
  });

  it("should return 400 for invalid car ID format", async () => {
    const res = await request(app).get("/car/invalid");

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid car ID");
  });

  it("should return 404 if car with given ID does not exist", async () => {
    const res = await request(app).get("/car/99999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Car not found");
  });

  it("should update a car by ID", async () => {
    const res = await request(app).put(`/car/${carId}`).send({
      color: "Black",
      rentalRate: "5000.00",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Car updated successfully");
  });

  it("should return 404 when updating with invalid car ID format", async () => {
    const res = await request(app).put("/car/abc").send({
      color: "Red",
    });

    expect(res.statusCode).toBe(404);
  });

  it("should return 404 when updating a non-existent car", async () => {
    const res = await request(app).put("/car/99999").send({
      color: "Red",
    });

    expect(res.statusCode).toBe(404);
  });

  it("should delete a car by ID", async () => {
    const res = await request(app).delete(`/car/${carId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Car deleted successfully");
  });

  it("should return 404 for invalid car ID format during deletion", async () => {
    const res = await request(app).delete("/car/invalid");

    expect(res.statusCode).toBe(404);
  });

  it("should return 404 when deleting a non-existent car", async () => {
    const res = await request(app).delete("/car/99999");

    expect(res.statusCode).toBe(404);
  });
});
