import request from "supertest";
import app from "../../src/index";
import db from "../../src/Drizzle/db";
import { CustomerTable, BookingsTable, ReservationTable } from "../../src/Drizzle/schema";
import { eq } from "drizzle-orm";

describe("Customer API Integration Tests", () => {
  let tempCustomerId: number;
  let tempEmail: string;

  beforeAll(async () => {
    // Ensure database connection is valid before tests
    await db.select().from(CustomerTable).limit(1).execute();
  });

  beforeEach(async () => {
    // Clean up existing test data
    await db.delete(BookingsTable).execute();
    await db.delete(ReservationTable).execute();
    await db.delete(CustomerTable).execute();

    // Create a unique test customer
    tempEmail = `test${Date.now()}@example.com`;

    const createRes = await request(app).post("/customer").send({
      email: tempEmail,
      password: "password123",
      firstName: "Test",
      lastName: "User",
      phoneNumber: "1234567890",
      address: "123 Test St",
    });

    expect(createRes.statusCode).toBe(201);

    const [customer] = await db
      .select()
      .from(CustomerTable)
      .where(eq(CustomerTable.email, tempEmail))
      .execute();

    tempCustomerId = customer.customerID;
  });

  afterAll(async () => {
    await db.$client.end();
  });

  // ✅ Test Cases

  it("should retrieve all customers", async () => {
    const res = await request(app).get("/customer");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Customers retrieved successfully");
    expect(Array.isArray(res.body.customers)).toBe(true);
    expect(res.body.customers.length).toBeGreaterThan(0);
    expect(res.body.customers[0].email).toBe(tempEmail);
  });

  it("should return empty bookings for a new customer", async () => {
    const res = await request(app).get(`/customer/${tempCustomerId}/bookings`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("bookings");
    expect(res.body.bookings).toEqual([]);
  });

  it("should return empty reservations for a new customer", async () => {
    const res = await request(app).get(`/customer/${tempCustomerId}/reservations`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Customer with reservations retrieved successfully");
    expect(res.body.customer.reservations).toEqual([]);
  });

  it("should return bookings and payments (none exist) for a customer", async () => {
    const res = await request(app).get(`/customer/${tempCustomerId}/bookings-payments`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("customers");
    expect(Array.isArray(res.body.customers)).toBe(true);
    expect(res.body.customers[0].bookings).toEqual([]);
  });

  it("should return bookings and payments by ID (none exist)", async () => {
    const res = await request(app).get(`/customer/${tempCustomerId}/booking-payment`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("bookings");
    expect(res.body.bookings).toEqual([]);
  });

  it("should return 404 for bookings of a non-existent customer", async () => {
    const res = await request(app).get("/customer/99999/bookings");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Customer not found");
  });

  it("should return 404 for reservations of a non-existent customer", async () => {
    const res = await request(app).get("/customer/99999/reservations");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Customer not found");
  });
});

