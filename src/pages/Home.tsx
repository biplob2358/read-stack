import Hero from "../components/home/Hero";
import NewBooks from "../components/home/NewBooks";

const Home = () => {
  return (
    <section className="bg-gray-50 text-gray-900 min-h-screen">
      <Hero />
      <NewBooks />
    </section>
  );
};

export default Home;
