export interface IWarehouse {
  warehouseName: string;
  ownerName: string;
  capacity: string; // Form data is often string
  location: string;
  description?: string;
  // images are handled as File objects in the frontend
}