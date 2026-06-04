import thar from "@/assets/suv-thar.jpg";
import bmw from "@/assets/suv-bmw-x5.jpg";
import benz from "@/assets/suv-mercedes-gle.jpg";
import vw from "@/assets/suv-vw-tiguan.jpg";
import creta from "@/assets/suv-creta.jpg";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import ev1 from "@/assets/ev-1.jpg";

export type SectionCar = {
  id: string;
  title: string;
  price: string;
  year: number;
  location: string;
  image: string;
  fuel?: string;
  transmission?: string;
  rating?: number;
  badge?: string;
};

export type SectionKey = "newlyarrived" | "premium" | "upcoming";

export const sectionMeta: Record<
  SectionKey,
  { title: string; tag: string; description: string; badgeClass: string }
> = {
  newlyarrived: {
    title: "Newly arrived cars",
    tag: "Just In",
    description: "Fresh inventory added this week from verified sellers across India.",
    badgeClass: "bg-india-green",
  },
  premium: {
    title: "Premium cars",
    tag: "Luxury",
    description: "Hand-picked luxury vehicles from BMW, Mercedes-Benz, Audi & more.",
    badgeClass: "bg-amber-500",
  },
  upcoming: {
    title: "Upcoming launches",
    tag: "Coming Soon",
    description: "Most-awaited cars launching in India over the next few months.",
    badgeClass: "bg-primary",
  },
};

export const sectionCars: Record<SectionKey, SectionCar[]> = {
  newlyarrived: [
    { id: "n1", title: "Tata Punch Creative AMT", price: "₹ 8,49,000", year: 2025, location: "Mumbai", image: car1, fuel: "Petrol", transmission: "Automatic", rating: 4.5 },
    { id: "n2", title: "Hyundai Creta SX(O) Turbo", price: "₹ 20,15,000", year: 2025, location: "Pune", image: creta, fuel: "Petrol", transmission: "Automatic", rating: 4.6 },
    { id: "n3", title: "Mahindra Thar 4x4 LX", price: "₹ 17,60,000", year: 2025, location: "Delhi", image: thar, fuel: "Diesel", transmission: "Manual", rating: 4.4 },
    { id: "n4", title: "Volkswagen Tiguan R-Line", price: "₹ 49,00,000", year: 2025, location: "Chennai", image: vw, fuel: "Petrol", transmission: "Automatic", rating: 4.7 },
    { id: "n5", title: "Kia Seltos GTX+ Turbo", price: "₹ 19,50,000", year: 2025, location: "Bengaluru", image: car3, fuel: "Petrol", transmission: "Automatic", rating: 4.5 },
    { id: "n6", title: "Tata Nexon EV Max", price: "₹ 17,40,000", year: 2025, location: "Hyderabad", image: ev1, fuel: "Electric", transmission: "Automatic", rating: 4.6 },
  ],
  premium: [
    { id: "p1", title: "BMW X5 xDrive40i M Sport", price: "₹ 99,90,000", year: 2025, location: "Mumbai", image: bmw, fuel: "Petrol", transmission: "Automatic", rating: 4.8, badge: "Premium" },
    { id: "p2", title: "Mercedes-Benz GLE 450d 4MATIC", price: "₹ 1,07,50,000", year: 2025, location: "Bengaluru", image: benz, fuel: "Diesel", transmission: "Automatic", rating: 4.9, badge: "Premium" },
    { id: "p3", title: "Audi Q7 55 TFSI Technology", price: "₹ 88,50,000", year: 2024, location: "Delhi", image: car2, fuel: "Petrol", transmission: "Automatic", rating: 4.7, badge: "Premium" },
    { id: "p4", title: "Volvo XC90 B6 Inscription", price: "₹ 99,00,000", year: 2024, location: "Pune", image: car3, fuel: "Hybrid", transmission: "Automatic", rating: 4.7, badge: "Premium" },
    { id: "p5", title: "Range Rover Velar P250 R-Dynamic", price: "₹ 92,40,000", year: 2024, location: "Hyderabad", image: car4, fuel: "Petrol", transmission: "Automatic", rating: 4.6, badge: "Premium" },
    { id: "p6", title: "Porsche Macan 2.0 Style Edition", price: "₹ 88,06,000", year: 2025, location: "Chennai", image: car1, fuel: "Petrol", transmission: "Automatic", rating: 4.8, badge: "Premium" },
  ],
  upcoming: [
    { id: "u1", title: "Maruti Suzuki eVitara", price: "Expected ₹ 17,00,000", year: 2026, location: "Pan India", image: ev1, fuel: "Electric", transmission: "Automatic", badge: "Coming Soon" },
    { id: "u2", title: "Hyundai Creta Electric", price: "Expected ₹ 22,00,000", year: 2026, location: "Pan India", image: creta, fuel: "Electric", transmission: "Automatic", badge: "Coming Soon" },
    { id: "u3", title: "Mahindra XEV 9e", price: "Expected ₹ 21,90,000", year: 2026, location: "Pan India", image: thar, fuel: "Electric", transmission: "Automatic", badge: "Coming Soon" },
    { id: "u4", title: "Tata Harrier EV", price: "Expected ₹ 25,00,000", year: 2026, location: "Pan India", image: car2, fuel: "Electric", transmission: "Automatic", badge: "Coming Soon" },
    { id: "u5", title: "Kia Syros", price: "Expected ₹ 10,00,000", year: 2026, location: "Pan India", image: car3, fuel: "Petrol", transmission: "Automatic", badge: "Coming Soon" },
    { id: "u6", title: "BMW iX1 LWB", price: "Expected ₹ 60,00,000", year: 2026, location: "Pan India", image: bmw, fuel: "Electric", transmission: "Automatic", badge: "Coming Soon" },
  ],
};

export const findSectionCar = (section: SectionKey, id: string) =>
  sectionCars[section]?.find((c) => c.id === id);
