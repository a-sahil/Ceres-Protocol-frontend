import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getWarehouseDetails } from "@/lib/api";
import { ArrowLeft, MapPin, Package, Shield, Star, CheckCircle2, Phone, Mail, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// REMOVE THE ENTIRE `const warehouseData = { ... };` MOCK OBJECT

const WarehouseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the specific warehouse data using React Query
  const { data: warehouse, isLoading, isError, error } = useQuery({
    queryKey: ['warehouse', id], // Unique key for this query
    queryFn: () => getWarehouseDetails(id!), // The fetching function
    enabled: !!id, // Only run the query if the id exists
  });

  // 1. Handle Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Warehouse Details...</p>
      </div>
    );
  }

  // 2. Handle Error State
  if (isError || !warehouse) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Could not load warehouse</h2>
        <p className="text-muted-foreground mb-6">
          {error ? error.message : "The requested warehouse could not be found."}
        </p>
        <Button onClick={() => navigate("/listings")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
      </div>
    );
  }

  // 3. Render Dynamic Data
  return (
    <div className="min-h-screen flex flex-col bg-off-white">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/listings")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Listings
          </Button>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-96 bg-muted">
                    {warehouse.images?.[0] ? (
                        <img
                            src={`http://localhost:5000/${warehouse.images[0].replace(/\\/g, '/')}`}
                            alt={warehouse.warehouseName}
                            className="w-full h-full object-cover"
                        />
                    ) : <div className="flex h-full w-full items-center justify-center text-muted-foreground">No Image</div>}
                </div>
              </div>

              {/* Warehouse Info */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {warehouse.warehouseName}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 text-sage" />
                  <span className="text-sm">{warehouse.location}</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-off-white rounded-lg">
                  <div className="text-center">
                    <Package className="h-6 w-6 text-sage mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="font-semibold text-sm">{warehouse.capacity} tons</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-6 w-6 text-sage mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">Owner</p>
                    <p className="font-semibold text-sm">{warehouse.ownerName}</p>
                  </div>
                </div>

                {warehouse.description && (
                    <div className="border-t border-border pt-6">
                        <h3 className="font-bold text-lg mb-3">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {warehouse.description}
                        </p>
                    </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right column */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-lg sticky top-24">
                <div className="mb-6">
                  <p className="text-2xl font-bold text-secondary mb-1">
                    {warehouse.price ? `₹${warehouse.price.toLocaleString()}` : 'Contact for Price'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    /ton/month
                  </p>
                </div>
                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full">Book Now</Button>
                  <Button variant="outline" size="lg" className="w-full">Request Quote</Button>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center">
                    Owner: <span className="font-medium text-foreground">{warehouse.ownerName}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WarehouseDetails;