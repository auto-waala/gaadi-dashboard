import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Car, Truck, Bike } from "lucide-react";

const blogData = Array.from({ length: 50 }, (_, i) => {
    const types = ["car", "bike", "truck"];
    const type = types[i % 3];

    return {
        id: i + 1,
        title: `${type.toUpperCase()} Guide ${i + 1}: Latest Tips & Trends`,
        description: `Explore insights about ${type}s, buying tips, financing options, and latest arrivals in the AutoNext platform.`,
        type,
        link: `/blog/${i + 1}`,
    };
});

const getIcon = (type: string) => {
    switch (type) {
        case "car":
            return <Car className="w-6 h-6 text-primary" />;
        case "bike":
            return <Bike className="w-6 h-6 text-primary" />;
        case "truck":
            return <Truck className="w-6 h-6 text-primary" />;
        default:
            return null;
    }
};

const Blog = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-12">
                <h1 className="text-3xl font-bold mb-6 text-center">AutoNext Blog</h1>

                <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Stay updated with the latest insights on cars, bikes, trucks, vehicle loans,
                    market trends, and buying guides across India.
                </p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {blogData.map((blog) => (
                        <Card key={blog.id} className="hover:shadow-lg transition">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    {getIcon(blog.type)}
                                    <span className="text-xs uppercase text-muted-foreground">
                                        {blog.type}
                                    </span>
                                </div>

                                <h2 className="font-semibold text-lg">
                                    <Link to={blog.link} className="hover:text-primary">
                                        {blog.title}
                                    </Link>
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    {blog.description}
                                </p>

                                <Link
                                    to={blog.link}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Read more →
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;