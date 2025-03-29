
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description: "Create an account as a patient, doctor, or pharmacy to get started with MediDrop."
  },
  {
    number: "02",
    title: "Find Services",
    description: "Browse medicines or find doctors based on your healthcare needs."
  },
  {
    number: "03",
    title: "Consult & Order",
    description: "Have a video consultation with doctors and get prescriptions for medications."
  },
  {
    number: "04",
    title: "Home Delivery",
    description: "Get your prescribed medications delivered right to your doorstep."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            How MediDrop Works
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Our simple process ensures you get the healthcare services you need with minimal effort.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-primary/20 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div className={`mb-8 md:mb-0 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-primary to-accent h-60 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white">{step.number}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`relative ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-auto right-auto md:-ml-5 md:-mr-5 w-10 h-10 rounded-full bg-primary hidden md:flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-background"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
