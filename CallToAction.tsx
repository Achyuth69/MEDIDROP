
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-accent overflow-hidden">
          <div className="px-6 py-16 md:p-16 md:pb-20 relative z-10">
            <div className="max-w-[600px] mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience Healthcare Reinvented?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Join thousands of patients, doctors, and pharmacies on MediDrop for a seamless healthcare experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary"
                  onClick={() => navigate("/register")}
                >
                  Create Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 hover:text-white"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
