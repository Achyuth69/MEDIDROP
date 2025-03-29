
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, File, PlusCircle, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { prescriptions } from "@/data/prescriptionData";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for doctor's appointments
  const upcomingAppointments = [
    {
      id: "app1",
      patientName: "John Patient",
      patientAge: 45,
      date: "2023-07-25",
      time: "10:00 AM",
      type: "Video Consultation",
      reason: "Regular checkup"
    },
    {
      id: "app2",
      patientName: "Emily Clark",
      patientAge: 32,
      date: "2023-07-25",
      time: "11:30 AM",
      type: "Video Consultation",
      reason: "Hypertension follow-up"
    },
    {
      id: "app3",
      patientName: "Michael Wilson",
      patientAge: 56,
      date: "2023-07-25",
      time: "2:00 PM",
      type: "In-person Visit",
      reason: "Chest pain evaluation"
    }
  ];

  // Doctor's issued prescriptions
  const doctorPrescriptions = prescriptions.filter(
    prescription => prescription.doctorId === user?.id
  );

  // Mock patients data
  const recentPatients = [
    {
      id: "pat1",
      name: "John Patient",
      age: 45,
      lastVisit: "2023-07-10",
      condition: "Hypertension"
    },
    {
      id: "pat2",
      name: "Emily Clark",
      age: 32,
      lastVisit: "2023-07-05",
      condition: "Diabetes Type 2"
    },
    {
      id: "pat3",
      name: "Robert Johnson",
      age: 62,
      lastVisit: "2023-06-28",
      condition: "Arthritis"
    }
  ];

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your patients and appointments here.
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
          <Button variant="outline">
            Manage Schedule
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              3 video consultations, 1 in-person
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prescriptions Written
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              From 89 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-8">
        <TabsList>
          <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <Button variant="outline" size="sm">
              View Full Schedule
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
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {appointment.patientName.split(' ').map(part => part[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">Age: {appointment.patientAge}</p>
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
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Reason: </span>
                        {appointment.reason}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline" size="sm">View Details</Button>
                      {appointment.type === "Video Consultation" && (
                        <Button size="sm">Start Call</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No appointments scheduled for today</p>
                <Button>View Full Schedule</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Recent Patients</h2>
            <Button variant="outline" size="sm">
              View All Patients
            </Button>
          </div>

          {recentPatients.length > 0 ? (
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {patient.name.split(' ').map(part => part[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-lg">{patient.name}</h3>
                          <div className="flex items-center gap-6 mt-1">
                            <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                            <p className="text-sm text-muted-foreground">Last Visit: {patient.lastVisit}</p>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{patient.condition}</Badge>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        Patient Profile
                      </Button>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Write Prescription
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No patients found</p>
                <Button>Add New Patient</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Recent Prescriptions</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {doctorPrescriptions.length > 0 ? (
            <div className="space-y-4">
              {doctorPrescriptions.map((prescription) => (
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
                          <span className="text-sm">Issued on: {prescription.date}</span>
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
                        <span className="font-medium">Notes: </span>
                        {prescription.notes}
                      </div>
                    )}
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" className="mr-2">
                        <File className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                      <Button>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No prescriptions found</p>
                <Button>Write New Prescription</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
