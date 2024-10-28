import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "../components/mode-toggle";
import spinningWheelImage from "../assets/demo.png";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  // Moon,
  // Sun,
  Zap,
} from "lucide-react";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => setMounted(true), []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 transition-colors duration-500">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            SpinWin
          </span>
        </div>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="dark:text-white ">
            <ModeToggle />
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Boost Your Sales with Interactive Discounts
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Engage customers and increase conversions with our exciting spinning
            wheel discount system.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs dark:bg-gray-800 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </section>

        <section
          id="features"
          className="container mx-auto px-4 py-20 relative z-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Why Choose SpinWin?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Boost Engagement",
                description:
                  "Keep customers excited and coming back for more with interactive discounts.",
                icon: Zap,
              },
              {
                title: "Increase Conversions",
                description:
                  "Turn browsers into buyers with irresistible, gamified offers.",
                icon: CheckCircle,
              },
              {
                title: "Maximize Revenue",
                description:
                  "Optimize your pricing strategy with data-driven insights.",
                icon: DollarSign,
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 transition-colors duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.div
                  ref={ref}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeIn}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={spinningWheelImage}
                    alt="Spinning Wheel"
                    width={500}
                    height={500}
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                  See It in Action
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                  Our intuitive spinning wheel interface is designed to capture
                  attention and drive conversions. Customize it to match your
                  brand and watch your engagement soar!
                </p>
                <Button
                  onClick={() => navigate("/demo")}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="container mx-auto px-4 py-20 relative z-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter",
                price: "$29",
                features: [
                  "Up to 1,000 spins/month",
                  "Basic analytics",
                  "Email support",
                ],
              },
              {
                title: "Pro",
                price: "$99",
                features: [
                  "Up to 10,000 spins/month",
                  "Advanced analytics",
                  "Priority support",
                  "Custom branding",
                ],
              },
              {
                title: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited spins",
                  "Dedicated account manager",
                  "API access",
                  "Custom integrations",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`${
                  index === 1 ? "border-purple-500 border-2" : ""
                } bg-white dark:bg-gray-800 transition-colors duration-300 dark:text-white`}
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                    {plan.title}
                  </h3>
                  <p className="text-4xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                    {plan.price}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={index === 1 ? "default" : "outline"}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="bg-gray-100 dark:bg-gray-800 py-20 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
              Ready to Get Started?
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="bg-white dark:bg-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        className="dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 text-gray-700 dark:text-white border rounded-md focus:outline-none focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">SpinWin</span>
              <p className="text-gray-400">
                © 2023 SpinWin. All rights reserved.
              </p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
