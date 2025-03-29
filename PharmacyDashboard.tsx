
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Package, PlusCircle, Search, Truck, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { prescriptions } from "@/data/prescriptionData";
import { Input } from "@/components/ui/input";

const PharmacyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter pending prescriptions for pharmacy to fulfill
  const pendingPrescriptions = prescriptions.filter(
    prescription => prescription.status === 'pending'
  );

  // Mock orders data
  const recentOrders = [
    {
      id: "ord1",
      patientName: "John Patient",
      date: "2023-07-20",
      items: ["Paracetamol", "Vitamin D"],
      status: "Delivered",
      address: "123 Main St, Anytown, AT 12345",
      amount: 13.98
    },
    {
      id: "ord2",
      patientName: "Emily Clark",
      date: "2023-07-22",
      items: ["Amoxicillin", "Paracetamol"],
      status: "Processing",
      address: "456 Oak Ave, Anytown, AT 12345",
      amount: 23.49
    },
    {
      id: "ord3",
      patientName: "Michael Wilson",
      date: "2023-07-23",
      items: ["Insulin", "Glucose Test Strips"],
      status: "Shipped",
      address: "789 Pine St, Anytown, AT 12345",
      amount: 65.75
    }
  ];

  // Mock inventory alerts
  const inventoryAlerts = [
    {
      id: "inv1",
      name: "Amoxicillin 500mg",
      currentStock: 5,
      minRequired: 10,
      status: "Low Stock"
    },
    {
      id: "inv2",
      name: "Insulin 10ml",
      currentStock: 2,
      minRequired: 5,
      status: "Low Stock"
    },
    {
      id: "inv3",
      name: "Atorvastatin 20mg",
      currentStock: 0,
      minRequired: 10,
      status: "Out of Stock"
    }
  ];

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage prescriptions and inventory here.
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Inventory
          </Button>
          <Button variant="outline">
            Manage Orders
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPrescriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              Need to be fulfilled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 processing, 3 shipping
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              Items need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245.89</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Prescription Lookup</h2>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Enter prescription ID or patient name" />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="prescriptions" className="space-y-8">
        <TabsList>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Pending Prescriptions</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {pendingPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {pendingPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Patient: {prescription.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Prescribed on: {prescription.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Prescription ID: {prescription.id}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 my-4">
                      <h4 className="font-medium mb-2">Medications</h4>
                      <ul className="space-y-2">
                        {prescription.medicines.map((med, index) => (
                          <li key={index} className="flex flex-col">
                            <div className="flex justify-between">
                              <span className="font-medium">{med.medicineName} ({med.dosage})</span>
                              <span className="text-sm text-muted-foreground">{med.duration}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{med.instructions}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">Contact Patient</Button>
                      <Button>Fulfill Prescription</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No pending prescriptions</p>
                <Button>View Fulfilled Prescriptions</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Customer: {order.patientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Order Date: {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Order ID: {order.id}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge 
                          variant={
                            order.status === 'Delivered' ? 'default' : 
                            order.status === 'Shipped' ? 'secondary' : 'outline'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 my-4">
                      <h4 className="font-medium mb-2">Items</h4>
                      <ul className="space-y-2">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between mt-4 pt-2 border-t">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${order.amount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm mb-4">
                      <span className="font-medium">Shipping Address: </span>
                      {order.address}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">View Details</Button>
                      {order.status === 'Processing' && (
                        <Button>
                          <Truck className="mr-2 h-4 w-4" />
                          Ship Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No recent orders</p>
                <Button>View Order History</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Inventory Alerts</h2>
            <Button variant="outline" size="sm">
              View All Inventory
            </Button>
          </div>

          {inventoryAlerts.length > 0 ? (
            <div className="space-y-4">
              {inventoryAlerts.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <div className="flex items-center gap-6 mt-1">
                          <p className="text-sm text-muted-foreground">Current Stock: {item.currentStock}</p>
                          <p className="text-sm text-muted-foreground">Min Required: {item.minRequired}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge 
                          variant={item.status === 'Out of Stock' ? 'destructive' : 'outline'}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button>Restock Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No inventory alerts</p>
                <Button>Manage Inventory</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PharmacyDashboard;
