import { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <footer className="bg-gray-100 flex items-center justify-center w-full h-16 border-t">
      <a
        className="flex items-center justify-center"
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by Misael Beray
      </a>
    </footer>
  );
};

export default Footer;
