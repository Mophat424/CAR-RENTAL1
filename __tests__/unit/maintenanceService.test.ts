// import {
//   createMaintenanceService,
//   getMaintenanceByIdService,
//   getMaintenanceService,
//   updateMaintenanceService,
//   deleteMaintenanceService,
// } from "../../src/maintenance/maintenanceService";

// import db from "../../src/Drizzle/db";
// import { TIMaintenance } from "../../src/Drizzle/schema";

// jest.mock("../../src/Drizzle/db", () => ({
//   insert: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
//   query: {
//     MaintenanceTable: {
//       findMany: jest.fn(),
//       findFirst: jest.fn()
//     }
//   }
// }));

// describe("Maintenance Service", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe("createMaintenanceService", () => {
//     it("should successfully create a maintenance record", async () => {
//       const maintenance: TIMaintenance = {
//         carID: 1,
//         maintenanceDate: "2024-06-01",
//         description: "Oil change and tire rotation"
//       };

//       (db.insert as jest.Mock).mockReturnValueOnce({
//         values: jest.fn().mockReturnValueOnce({
//           returning: jest.fn().mockResolvedValueOnce([maintenance])
//         })
//       });

//       const result = await createMaintenanceService(maintenance);
//       expect(result).toEqual(maintenance);
//     });

//     it("should return null when maintenance creation fails", async () => {
//       const maintenance: TIMaintenance = {
//         carID: 1,
//         maintenanceDate: "2024-06-01",
//         description: "Oil change and tire rotation"
//       };

//       (db.insert as jest.Mock).mockReturnValueOnce({
//         values: jest.fn().mockReturnValueOnce({
//           returning: jest.fn().mockResolvedValueOnce([])
//         })
//       });

//       const result = await createMaintenanceService(maintenance);
//       expect(result).toBeNull();
//     });
//   });

//   describe("getMaintenanceByIdService", () => {
//     it("should retrieve a maintenance record by ID", async () => {
//       const mockData = { maintenanceID: 1, description: "Engine repair" };
//       (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(mockData);

//       const result = await getMaintenanceByIdService(1);
//       expect(result).toEqual(mockData);
//     });

//     it("should return undefined if no maintenance record is found with the given ID", async () => {
//       (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);
//       const result = await getMaintenanceByIdService(999);
//       expect(result).toBeUndefined();
//     });
//   });

//   describe("getMaintenanceService", () => {
//     it("should return a list of all maintenance records", async () => {
//       const mockData = [{ maintenanceID: 1 }, { maintenanceID: 2 }];
//       (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce(mockData);

//       const result = await getMaintenanceService();
//       expect(result).toEqual(mockData);
//     });

//     it("should return an empty array if no maintenance records exist", async () => {
//       (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce([]);
//       const result = await getMaintenanceService();
//       expect(result).toEqual([]);
//     });
//   });

//   describe("updateMaintenanceService", () => {
//     it("should update an existing maintenance record successfully", async () => {
//       (db.update as jest.Mock).mockReturnValueOnce({
//         set: jest.fn().mockReturnValueOnce({
//           where: jest.fn().mockReturnValueOnce({
//             returning: jest.fn().mockResolvedValueOnce([{ maintenanceID: 1 }])
//           })
//         })
//       });

//       const result = await updateMaintenanceService(1, {
//         carID: 1,
//         maintenanceDate: "2024-06-01",
//         description: "Oil change and tire rotation"
//       });

//       expect(result).toBe("Maintenance updated successfully");
//     });

//     it("should return null if no maintenance record was updated", async () => {
//       (db.update as jest.Mock).mockReturnValueOnce({
//         set: jest.fn().mockReturnValueOnce({
//           where: jest.fn().mockReturnValueOnce({
//             returning: jest.fn().mockResolvedValueOnce([])
//           })
//         })
//       });

//       const result = await updateMaintenanceService(99, {
//         carID: 1,
//         maintenanceDate: "2024-06-01",
//         description: "Oil change and tire rotation"
//       });

//       expect(result).toBeNull();
//     });
//   });

//   describe("deleteMaintenanceService", () => {
//     it("should delete a maintenance record and return a success message", async () => {
//       (db.delete as jest.Mock).mockReturnValueOnce({
//         where: jest.fn().mockReturnValueOnce({
//           returning: jest.fn().mockResolvedValueOnce([{ maintenanceID: 1 }])
//         })
//       });

//       const result = await deleteMaintenanceService(1);
//       expect(result).toBe("Maintenance deleted successfully");
//     });

//     it("should return null if the maintenance record does not exist", async () => {
//       (db.delete as jest.Mock).mockReturnValueOnce({
//         where: jest.fn().mockReturnValueOnce({
//           returning: jest.fn().mockResolvedValueOnce([])
//         })
//       });

//       const result = await deleteMaintenanceService(999);
//       expect(result).toBeNull();
//     });
//   });
// });


import {
  createMaintenanceService,
  getMaintenanceByIdService,
  getMaintenanceService,
  updateMaintenanceService,
  deleteMaintenanceService,
} from "../../src/maintenance/maintenanceService";

import db from "../../src/Drizzle/db";
import { TIMaintenance } from "../../src/Drizzle/schema";

jest.mock("../../src/Drizzle/db", () => ({
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  query: {
    MaintenanceTable: {
      findMany: jest.fn(),
      findFirst: jest.fn()
    }
  }
}));

describe("Maintenance Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createMaintenanceService", () => {
    it("should successfully create a maintenance record", async () => {
      const maintenance: TIMaintenance = {
        carID: 1,
        maintenanceDate: "2024-06-01",
        description: "Oil change and tire rotation",
        cost: "100.00"
      };

      (db.insert as jest.Mock).mockReturnValueOnce({
        values: jest.fn().mockReturnValueOnce({
          returning: jest.fn().mockResolvedValueOnce([maintenance])
        })
      });

      const result = await createMaintenanceService(maintenance);
      expect(result).toEqual(maintenance);
    });

    it("should return null when maintenance creation fails", async () => {
      const maintenance: TIMaintenance = {
        carID: 1,
        maintenanceDate: "2024-06-01",
        description: "Oil change and tire rotation",
        cost: "100.00"
      };

      (db.insert as jest.Mock).mockReturnValueOnce({
        values: jest.fn().mockReturnValueOnce({
          returning: jest.fn().mockResolvedValueOnce([])
        })
      });

      const result = await createMaintenanceService(maintenance);
      expect(result).toBeNull();
    });
  });

  describe("getMaintenanceByIdService", () => {
    it("should retrieve a maintenance record by ID", async () => {
      const mockData = { maintenanceID: 1, description: "Engine repair" };
      (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(mockData);

      const result = await getMaintenanceByIdService(1);
      expect(result).toEqual(mockData);
    });

    it("should return undefined if no maintenance record is found with the given ID", async () => {
      (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined);
      const result = await getMaintenanceByIdService(999);
      expect(result).toBeUndefined();
    });
  });

  describe("getMaintenanceService", () => {
    it("should return a list of all maintenance records", async () => {
      const mockData = [{ maintenanceID: 1 }, { maintenanceID: 2 }];
      (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce(mockData);

      const result = await getMaintenanceService();
      expect(result).toEqual(mockData);
    });

    it("should return an empty array if no maintenance records exist", async () => {
      (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce([]);
      const result = await getMaintenanceService();
      expect(result).toEqual([]);
    });
  });

  describe("updateMaintenanceService", () => {
    it("should update an existing maintenance record successfully", async () => {
      (db.update as jest.Mock).mockReturnValueOnce({
        set: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockReturnValueOnce({
            returning: jest.fn().mockResolvedValueOnce([{ maintenanceID: 1 }])
          })
        })
      });

      const result = await updateMaintenanceService(1, {
        carID: 1,
        maintenanceDate: "2024-06-01",
        description: "Oil change and tire rotation",
        cost: "100.00"
      });

      // Must match the controller's message return structure
      expect(result).toBe("Maintenance updated successfully");
    });

    it("should return null if no maintenance record was updated", async () => {
      (db.update as jest.Mock).mockReturnValueOnce({
        set: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockReturnValueOnce({
            returning: jest.fn().mockResolvedValueOnce([])
          })
        })
      });

      const result = await updateMaintenanceService(99, {
        carID: 1,
        maintenanceDate: "2024-06-01",
        description: "Oil change and tire rotation",
        cost: "100.00"
      });

      expect(result).toBeNull();
    });
  });

  describe("deleteMaintenanceService", () => {
    it("should delete a maintenance record and return a success message", async () => {
      (db.delete as jest.Mock).mockReturnValueOnce({
        where: jest.fn().mockReturnValueOnce({
          returning: jest.fn().mockResolvedValueOnce([{ maintenanceID: 1 }])
        })
      });

      const result = await deleteMaintenanceService(1);
      expect(result).toBe("Maintenance deleted successfully");
    });

    it("should return null if the maintenance record does not exist", async () => {
      (db.delete as jest.Mock).mockReturnValueOnce({
        where: jest.fn().mockReturnValueOnce({
          returning: jest.fn().mockResolvedValueOnce([])
        })
      });

      const result = await deleteMaintenanceService(999);
      expect(result).toBeNull();
    });
  });
});
