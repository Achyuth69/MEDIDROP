
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, PlusCircle, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { prescriptions } from "@/data/prescriptionData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Filter prescriptions for the current patient
  const patientPrescriptions = prescriptions.filter(
    prescription => prescription.patientId === user?.id
  );

  const upcomingAppointments = [
    {
      id: "app1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "2023-07-25",
      time: "10:00 AM",
      type: "Video Consultation"
    },
    {
      id: "app2",
      doctorName: "Dr. Robert Chen",
      specialty: "Cardiologist",
      date: "2023-08-05",
      time: "2:30 PM",
      type: "In-person Visit"
    }
  ];

  const recentOrders = [
    {
      id: "ord1",
      date: "2023-07-20",
      items: ["Paracetamol", "Vitamin D"],
      status: "Delivered",
      total: 13.98
    },
    {
      id: "ord2",
      date: "2023-07-15",
      items: ["Amoxicillin"],
      status: "Delivered",
      total: 12.99
    }
  ];

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your healthcare needs here.
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button onClick={() => navigate("/doctors")}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Book Consultation
          </Button>
          <Button variant="outline" onClick={() => navigate("/medicines")}>
            Order Medicines
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Prescriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patientPrescriptions.filter(p => p.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need to be filled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Out for delivery
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Updated 3 days ago
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-8">
        <TabsList>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button variant="outline" size="sm" onClick={() => navigate("/doctors")}>
              Schedule New
            </Button>
          </div>

          {upcomingAppointments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {appointment.doctorName.split(' ').map(part => part[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                      </div>
                      <Badge variant={appointment.type === "Video Consultation" ? "outline" : "secondary"}>
                        {appointment.type}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      {appointment.type === "Video Consultation" && (
                        <Button size="sm">Join Call</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Button onClick={() => navigate("/doctors")}>Schedule Appointment</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Your Prescriptions</h2>
          </div>

          {patientPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {patientPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Dr. {prescription.doctorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Prescribed on {prescription.date}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge 
                          variant={
                            prescription.status === 'filled' ? 'default' : 
                            prescription.status === 'pending' ? 'outline' : 'destructive'
                          }
                        >
                          {prescription.status === 'filled' ? 'Filled' : 
                           prescription.status === 'pending' ? 'Pending' : 'Cancelled'}
                        </Badge>
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
                    
                    {prescription.notes && (
                      <div className="text-sm">
                        <span className="font-medium">Doctor's Notes: </span>
                        {prescription.notes}
                      </div>
                    )}
                    
                    {prescription.status === 'pending' && (
                      <div className="flex justify-end mt-4">
                        <Button>Order Medicines</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No prescriptions found</p>
                <Button onClick={() => navigate("/doctors")}>Consult a Doctor</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Button variant="outline" size="sm" onClick={() => navigate("/medicines")}>
              Order Medicines
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
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Order Date: {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Order ID: {order.id}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge 
                          variant={
                            order.status === 'Delivered' ? 'default' : 
                            order.status === 'Processing' ? 'outline' : 'secondary'
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
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No orders found</p>
                <Button onClick={() => navigate("/medicines")}>Order Medicines</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDashboard;
