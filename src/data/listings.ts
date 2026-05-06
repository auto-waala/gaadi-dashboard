import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import ev1 from "@/assets/ev-1.jpg";
import cycle1 from "@/assets/cycle-1.jpg";
import truck1 from "@/assets/truck-1.jpg";
import tractor1 from "@/assets/tractor-1.jpg";
import bus1 from "@/assets/bus-1.jpg";
import auto1 from "@/assets/auto-1.jpg";
import parts1 from "@/assets/parts-1.jpg";

export type Listing = {
  id: string;
  title: string;
  price: number;
  image: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG" | "N/A";
  transmission: "Manual" | "Automatic" | "N/A";
  location: string;
  postedAgo: string;
  featured?: boolean;
  category:
    | "Cars"
    | "EV"
    | "Bikes"
    | "Cycles"
    | "Trucks"
    | "Tractors"
    | "Buses"
    | "Auto/Rickshaw"
    | "Spare Parts";
};

export const listings: Listing[] = [
  // Cars
  {
    id: "1",
    title: "Maruti Suzuki Swift VXi",
    price: 685000,
    image: car1,
    year: 2021,
    km: 28500,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Mumbai",
    postedAgo: "2 days ago",
    featured: true,
    category: "Cars",
  },
  {
    id: "2",
    title: "Hyundai Creta SX Diesel",
    price: 1490000,
    image: car2,
    year: 2020,
    km: 41200,
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Delhi",
    postedAgo: "5 days ago",
    category: "Cars",
  },
  {
    id: "3",
    title: "Kia Seltos GTX+ Turbo",
    price: 1725000,
    image: car3,
    year: 2023,
    km: 12000,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Bengaluru",
    postedAgo: "1 day ago",
    featured: true,
    category: "Cars",
  },

  // EV
  {
    id: "ev1",
    title: "Tata Nexon EV Max XZ+ Lux",
    price: 1650000,
    image: ev1,
    year: 2024,
    km: 6200,
    fuel: "Electric",
    transmission: "Automatic",
    location: "Pune",
    postedAgo: "12 hours ago",
    featured: true,
    category: "EV",
  },
  {
    id: "ev2",
    title: "MG ZS EV Excite Pro",
    price: 1895000,
    image: ev1,
    year: 2023,
    km: 14500,
    fuel: "Electric",
    transmission: "Automatic",
    location: "Hyderabad",
    postedAgo: "3 days ago",
    category: "EV",
  },

  // Bikes
  {
    id: "b1",
    title: "Royal Enfield Classic 350",
    price: 185000,
    image: car4,
    year: 2022,
    km: 8400,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Jaipur",
    postedAgo: "1 week ago",
    featured: true,
    category: "Bikes",
  },
  {
    id: "b2",
    title: "KTM Duke 390",
    price: 245000,
    image: car4,
    year: 2023,
    km: 4200,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Chennai",
    postedAgo: "4 days ago",
    category: "Bikes",
  },

  // Cycles
  {
    id: "c1",
    title: "Hero Sprint Pro 26T MTB",
    price: 12500,
    image: cycle1,
    year: 2024,
    km: 0,
    fuel: "N/A",
    transmission: "N/A",
    location: "Ahmedabad",
    postedAgo: "Today",
    category: "Cycles",
  },
  {
    id: "c2",
    title: "Btwin Rockrider ST120",
    price: 18900,
    image: cycle1,
    year: 2023,
    km: 0,
    fuel: "N/A",
    transmission: "N/A",
    location: "Kolkata",
    postedAgo: "2 days ago",
    featured: true,
    category: "Cycles",
  },

  // Trucks
  {
    id: "t1",
    title: "Tata LPT 1109 Cargo Truck",
    price: 1250000,
    image: truck1,
    year: 2019,
    km: 184000,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Nagpur",
    postedAgo: "3 days ago",
    category: "Trucks",
  },
  {
    id: "t2",
    title: "Ashok Leyland Dost Strong",
    price: 685000,
    image: truck1,
    year: 2021,
    km: 92000,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Surat",
    postedAgo: "6 days ago",
    featured: true,
    category: "Trucks",
  },

  // Tractors
  {
    id: "tr1",
    title: "Mahindra 575 DI XP Plus",
    price: 645000,
    image: tractor1,
    year: 2022,
    km: 1200,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Ludhiana",
    postedAgo: "1 day ago",
    featured: true,
    category: "Tractors",
  },
  {
    id: "tr2",
    title: "Sonalika DI 745 III Sikander",
    price: 580000,
    image: tractor1,
    year: 2021,
    km: 2400,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Indore",
    postedAgo: "1 week ago",
    category: "Tractors",
  },

  // Buses
  {
    id: "bs1",
    title: "Tata Starbus 32 Seater",
    price: 1850000,
    image: bus1,
    year: 2018,
    km: 220000,
    fuel: "Diesel",
    transmission: "Manual",
    location: "Lucknow",
    postedAgo: "5 days ago",
    category: "Buses",
  },

  // Auto/Rickshaw
  {
    id: "a1",
    title: "Bajaj RE Compact CNG Auto",
    price: 175000,
    image: auto1,
    year: 2022,
    km: 38000,
    fuel: "CNG",
    transmission: "Manual",
    location: "Delhi",
    postedAgo: "2 days ago",
    category: "Auto/Rickshaw",
  },

  // Spare Parts
  {
    id: "sp1",
    title: "17\" Alloy Wheels Set (4 pcs)",
    price: 22000,
    image: parts1,
    year: 2024,
    km: 0,
    fuel: "N/A",
    transmission: "N/A",
    location: "Mumbai",
    postedAgo: "Today",
    featured: true,
    category: "Spare Parts",
  },
  {
    id: "sp2",
    title: "Used Engine Block — Swift 1.2L",
    price: 35000,
    image: parts1,
    year: 2020,
    km: 0,
    fuel: "N/A",
    transmission: "N/A",
    location: "Bengaluru",
    postedAgo: "4 days ago",
    category: "Spare Parts",
  },
];

export const formatPKR = (n: number) => "₹ " + n.toLocaleString("en-IN");
