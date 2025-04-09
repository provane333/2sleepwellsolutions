import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Better Sleep?</h2>
          <p className="text-lg mb-8">Join thousands of customers who have transformed their sleep quality with Trim Sleep solutions.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild className="bg-white text-primary hover:bg-neutral-100 px-8 py-3 rounded-full font-medium">
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-full font-medium">
              <Link href="/quiz">Take Sleep Quiz</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center">
            <div className="flex -space-x-4 mb-4 sm:mb-0 sm:mr-6">
              <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="" className="w-10 h-10 rounded-full border-2 border-white" />
              <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-accent-dark text-xs font-medium">+2K</span>
            </div>
            <p className="text-neutral-100">Joined the Trim Sleep community this month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
