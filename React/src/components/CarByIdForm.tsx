import React, { useState } from 'react';
import type { Car } from '../types/Car';

const CarByIdForm: React.FC = () => {
  const [carId, setCarId] = useState('');
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCar = async () => {
    try {
      const response = await fetch(`http://localhost:3000/car/${carId}`);
      if (!response.ok) throw new Error('Car not found');
      const data = await response.json();
      setCar(data.car); // assuming { message, car }
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Unexpected error');
      setCar(null);
    }
  };

  return (
    <div>
      <h2>Fetch Car by ID</h2>
      <input
        type="number"
        value={carId}
        onChange={(e) => setCarId(e.target.value)}
        placeholder="Enter Car ID"
      />
      <button onClick={fetchCar}>Fetch</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {car && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Car Details</h3>
          <p><strong>Model:</strong> {car.carModel}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Rental Rate:</strong> ${car.rentalRate}</p>
          <p><strong>Available:</strong> {car.availability ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default CarByIdForm;
