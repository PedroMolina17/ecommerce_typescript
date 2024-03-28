interface FooterProps {
  isOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "ml-64" : "ml-12"
      } duration-150 col-span-12 h-16 flex text-white border-t border-gray-700`}
    >
      <div className="w-full px-10 my-auto">
        React|2024 © All Rights Reserved.
      </div>
      <span className="w-full px-10 text-right my-auto">v1.0.0</span>
    </div>
  );
};

export default Footer;
