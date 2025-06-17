// import express, { Express } from "express";
// import dotenv from "dotenv";
// import { customerRouter } from "./customer/customerRouter";

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/customers", customerRouter);

// // Basic route for testing
// app.get("/", (req, res) => {
//   res.send("Car Rental API is running!");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


import express from 'express';
import customer from './customer/customerRouter';
import car from "./car/carRouter";
import payment from "./payment/paymentRouter";
// import booking from "./bookings/bookingsRouter";
import location from "./location/locationRouter";
import insurance from './insurance/insuranceRouter';
import maintenance from './maintenance/maintenanceRouter';
import reservation from './reservation/reservationRouter';
import cors from 'cors';

const initializeApp = () => {
  const app = express();



  app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Optional: if you're sending cookies or headers like Authorization
}));

  // MIDDLEWARE
  app.use(express.json());

  // ROUTES
  customer(app);
  car(app);
  payment(app);
  // booking(app);
  location(app);
  insurance(app);
  maintenance(app);
  reservation(app);

  app.get('/', (req, res) => {
    res.send('Welcome to the Car Rental API');
  });

  return app;
};

const app = initializeApp();


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

export default app;
