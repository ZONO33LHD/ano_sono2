import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得

  return (
    <footer className="fixed bottom-0 w-full h-16 bg-gray-800 text-white p-4 text-center">
      © {currentYear} All Rights Reserved.
    </footer>
  );
};

export default Footer;
