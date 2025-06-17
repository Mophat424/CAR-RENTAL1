// import { Request, Response } from "express";
// import {createLocationService,deleteLocationService,updateLocationService, getLocationsService,getLocationByIdService} from "./locationService";

// // Location controller
// export const createLocationController = async (req: Request, res: Response) => {
//     try {
//         const location = req.body;
//         const createLocation = await createLocationService(location);
//        if(!createLocation) return res.status(500).json({ error: "Failed to create location" });
//         return res.status(201).json({
//             message: "Location created successfully"});

        
//     } catch (error: any) {
//         return res.status(500).json({
//             message: error.message})
        
//     }
// }
// // Get all locations controller
// export const getLocationsController = async (req: Request, res: Response) => {
//     try {
//         const locations = await getLocationsService();
//         if (!locations || locations.length === 0) {
//             return res.status(404).json({ message: "No locations found" });
//         }
//         return res.status(200).json({ message: "Locations retrieved successfully", locations });
//     } catch (error: any) {
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// }
// // Get location by ID controller
// export const getLocationByIdController = async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id);
//         if (isNaN(id)) {
//             return res.status(400).json({ message: "Invalid location ID" });
//         }
//         const location = await getLocationByIdService(id);
//         if (!location) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         return res.status(200).json({ message: "Location retrieved successfully", location });
//     } catch (error: any) {
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// }
// // Update location controller
// export const updateLocationController = async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id);
//         if (isNaN(id)) {
//             return res.status(404).json({ message: "Invalid location ID" });
//         }
//         const location = req.body;
//         const existingLocation = await getLocationByIdService(id);
//         if (!existingLocation) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         const updatedLocation = await updateLocationService(id, location);
//         if (!updatedLocation) {
//             return res.status(404).json({ message: "Location not updated" });
//         }
//         return res.status(200).json({ message: "Location updated successfully", updatedLocation });
//     } catch (error: any) {
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// }
// // Delete location controller
// export const deleteLocationController = async (req: Request, res: Response) => {
//     try {
//         const id = parseInt(req.params.id);
//         if (isNaN(id)) {
//             return res.status(404).json({ message: "Invalid location ID" });
//         }
//         const existingLocation = await getLocationByIdService(id);
//         if (!existingLocation) {
//             return res.status(404).json({ message: "Location not found" });
//         }
//         const deletedLocation = await deleteLocationService(id);
//         if (!deletedLocation) {
//             return res.status(404).json({ message: "Location not deleted" });
//         }
//         return res.status(200).json({ message: "Location deleted successfully" });
//     } catch (error: any) {
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//     }
// }











import { Request, Response } from "express";
import {
    createLocationService,
    deleteLocationService,
    updateLocationService,
    getLocationsService,
    getLocationByIdService
} from "./locationService";

// Create a new location
export const createLocationController = async (req: Request, res: Response) => {
    try {
        const { locationName, address, contactNumber } = req.body;

        // Validate required fields
        if (!locationName || !address || !contactNumber) {
            return res.status(400).json({
                message: "locationName, address, and contactNumber are required"
            });
        }

        const createLocation = await createLocationService({
            locationName,
            address,
            contactNumber
        });

        if (!createLocation) {
            return res.status(500).json({ error: "Failed to create location" });
        }

        return res.status(201).json({
            message: "Location created successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Get all locations
export const getLocationsController = async (req: Request, res: Response) => {
    try {
        const locations = await getLocationsService();
        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: "No locations found" });
        }
        return res.status(200).json({
            message: "Locations retrieved successfully",
            locations
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get location by ID
export const getLocationByIdController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid location ID" });
        }

        const location = await getLocationByIdService(id);
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }

        return res.status(200).json({
            message: "Location retrieved successfully",
            location
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Update location
export const updateLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid location ID" });
        }

        const location = req.body;
        const existingLocation = await getLocationByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        const updatedLocation = await updateLocationService(id, location);
        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not updated" });
        }

        return res.status(200).json({
            message: "Location updated successfully",
            updatedLocation
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// Delete location
export const deleteLocationController = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "Invalid location ID" });
        }

        const existingLocation = await getLocationByIdService(id);
        if (!existingLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        const deletedLocation = await deleteLocationService(id);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not deleted" });
        }

        return res.status(200).json({
            message: "Location deleted successfully"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


