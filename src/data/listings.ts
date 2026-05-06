import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

export type Listing = {
  id: string;
  title: string;
  price: number;
  image: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  location: string;
  postedAgo: string;
  featured?: boolean;
  category: string;
};

export const listings: Listing[] = [
  {
    id: "1",
    title: "Volkswagen Up! 1.0 TSI",
    price: 1850000,
    image: car1,
    year: 2021,
    km: 28500,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Karachi",
    postedAgo: "2 days ago",
    featured: true,
    category: "Hatchback",
  },
  {
    id: "2",
    title: "Peugeot 108 Active",
    price: 1490000,
    image: car2,
    year: 2020,
    km: 41200,
    fuel: "Petrol",
    transmission: "Automatic",
    location: "Lahore",
    postedAgo: "5 days ago",
    category: "Hatchback",
  },
  {
    id: "3",
    title: "Kia Sorento Premium SUV",
    price: 7250000,
    image: car3,
    year: 2023,
    km: 12000,
    fuel: "Diesel",
    transmission: "Automatic",
    location: "Islamabad",
    postedAgo: "1 day ago",
    featured: true,
    category: "SUV",
  },
  {
    id: "4",
    title: "Honda CBR Sport 250",
    price: 685000,
    image: car4,
    year: 2022,
    km: 8400,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Rawalpindi",
    postedAgo: "1 week ago",
    category: "Bike",
  },
  {
    id: "5",
    title: "Volkswagen Up! GTI Edition",
    price: 2100000,
    image: car1,
    year: 2022,
    km: 19800,
    fuel: "Petrol",
    transmission: "Manual",
    location: "Multan",
    postedAgo: "3 days ago",
    category: "Hatchback",
  },
  {
    id: "6",
    title: "Kia Sorento GT-Line AWD",
    price: 8950000,
    image: car3,
    year: 2024,
    km: 4200,
    fuel: "Hybrid",
    transmission: "Automatic",
    location: "Karachi",
    postedAgo: "12 hours ago",
    featured: true,
    category: "SUV",
  },
];

export const formatPKR = (n: number) =>
  "PKR " + n.toLocaleString("en-PK");
