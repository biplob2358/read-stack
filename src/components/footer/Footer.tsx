const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
          © {new Date().getFullYear()} ReadStack. Built with ❤️ by Biplob Ghosh.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
