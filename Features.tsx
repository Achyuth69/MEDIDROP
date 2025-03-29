
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Pill, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Easy Consultations",
    description: "Book appointments with top healthcare professionals in just a few clicks."
  },
  {
    icon: <Pill className="h-10 w-10 text-primary" />,
    title: "Medicine Delivery",
    description: "Get your prescribed medications delivered to your doorstep with minimal wait time."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: "Secure Payments",
    description: "Make payments securely through our encrypted payment gateway."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Access to Specialists",
    description: "Connect with specialized doctors for personalized healthcare advice."
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "24/7 Availability",
    description: "Access healthcare services round the clock for emergencies and consultations."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Data Privacy",
    description: "Your health data is protected with state-of-the-art encryption and security measures."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            MediDrop offers a range of services designed to make healthcare accessible, convenient, and efficient.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
