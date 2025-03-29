
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      
      <div 
        className="absolute rounded-full w-96 h-96 bg-medidrop-300/30 blur-3xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in">
                Healthcare at Your Doorstep
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                MediDrop connects you with healthcare professionals and delivers medications right to your door. Experience healthcare like never before.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" onClick={() => navigate("/medicines")}>Browse Medicines</Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/doctors")}>Consult a Doctor</Button>
            </div>
            <div className="flex items-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex -space-x-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-medidrop-100 dark:bg-medidrop-800">
                  <span className="text-sm font-medium text-medidrop-700 dark:text-medidrop-300">5K+</span>
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-medidrop-100 dark:bg-medidrop-800">
                  <span className="text-sm font-medium text-medidrop-700 dark:text-medidrop-300">300+</span>
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-medidrop-100 dark:bg-medidrop-800">
                  <span className="text-sm font-medium text-medidrop-700 dark:text-medidrop-300">50+</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">5,000+ patients</span> served by <span className="font-medium">300+ doctors</span> and <span className="font-medium">50+ pharmacies</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-full max-w-[450px] animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-medidrop-400 to-medidrop-600 dark:from-medidrop-600 dark:to-medidrop-800 rounded-3xl rotate-6 blur-sm opacity-80"></div>
              <div className="absolute inset-0 glassmorphism rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="p-6 w-full">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-4 shadow-sm">
                    <h3 className="font-medium text-lg mb-2">Consultation with Dr. Sarah</h3>
                    <p className="text-muted-foreground text-sm mb-4">Today, 4:30 PM • 30 minutes</p>
                    <Button className="w-full mb-2">Join Video Call</Button>
                    <Button variant="outline" className="w-full">Reschedule</Button>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h3 className="font-medium text-lg mb-2">Your Medication</h3>
                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                      <span>Amoxicillin</span>
                      <span className="text-muted-foreground">500mg</span>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                      <span>Loratadine</span>
                      <span className="text-muted-foreground">10mg</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="secondary" size="sm">Track Delivery</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
