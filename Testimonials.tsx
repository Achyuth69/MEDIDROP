
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Michael Thompson",
    role: "Patient",
    content: "MediDrop has revolutionized how I manage my health. I can consult with my doctor and get medications delivered without leaving home. It's been especially helpful during my recovery from surgery.",
    avatar: "MT"
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Cardiologist",
    content: "As a healthcare professional, I find MediDrop to be an excellent platform for connecting with my patients remotely. The interface is intuitive, and the prescription system is secure and reliable.",
    avatar: "ER"
  },
  {
    name: "HealthPlus Pharmacy",
    role: "Pharmacy Partner",
    content: "Partnering with MediDrop has significantly expanded our customer base. The platform streamlines the prescription fulfillment process, allowing us to provide faster service to patients.",
    avatar: "HP"
  },
  {
    name: "Sarah Johnson",
    role: "Chronic Patient",
    content: "Managing my chronic condition used to require frequent clinic visits. With MediDrop, I can have regular check-ins with my doctor and receive my monthly medications on time, every time.",
    avatar: "SJ"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Trusted by Patients, Doctors, and Pharmacies
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Hear what our users have to say about their experience with MediDrop.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
