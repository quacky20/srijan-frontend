import PageHeader from "../components/PageHeader/PageHeader";
import { motion } from "framer-motion";
import MerchCard from "../components/MerchCard";

function MerchPage() {
  const demoMerchs = [
    {
      name: "t-shirt",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1754733502_1885226.jpg?w=480&dpr=2",
      description:
        "Master all four elements of style in this Avatar oversized tee! Perfect for when you're out there trying to save the world (or just grabbing coffee ⚡). Style Tip: Pair it with relaxed-fit pants or shorts for that avatar state of comfort.",
    },
    {
      name: "jacket",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759337902_9837494.jpg?w=480&dpr=2",
      description:
        "A streetwear staple that’s roomy, comfortable, and statement-ready. Great for layering over tees, hoodies, or even sweatshirts. Style Tip: Add skinny jeans or cargos to balance out the oversized fit.",
    },
    {
      name: "hoodie",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758793855_1776968.jpg?w=480&dpr=2",
      description:
        "Believe it! Get your hands on this hoodie that could withstand a Rasengan (but we don't recommend testing that). Created for the men who know their jutsu and aren't afraid to show their anime allegiance.Style Tip: Rock this anime essential with cargo pants and high-tops.",
    },
    {
      name: "oversized t-shirt",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1759926522_2643336.jpg?w=480&dpr=2",
      description:
        "Official Licensed Stranger Things Oversized T-Shirt. Shop for Stranger Things: Upside Down Spray Oversized T-Shirts at The Souled Store.",
    },
    {
      name: "oversized-hoodie",
      image:
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1763185851_1111524.jpg?w=480&dpr=2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="pb-30">
      <PageHeader
        title="MERCHANDISE"
        subtitle="Explore the vibrant spectrum of cultural celebrations"
        showBackButton={true}
        backPath="/"
        titleDelay={0.2}
        showStars={true}
      />
      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center gap-10 px-8 md:px-20 lg:px-30 xl:px-30">
        {demoMerchs.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="w-85"
          >
            <MerchCard event={event} index={i} onClick={() => {}} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="gallery-footer-decoration"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}

export default MerchPage;
