import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#030712" }}>
      <Navbar />
      <Hero />
    </div>
  );
}
