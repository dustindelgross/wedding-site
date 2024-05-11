import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false);

  interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    index?: number;
  }

  const NavLink = ({ href, children, index }: NavLinkProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, transform: "rotateY(90deg)" }}
        animate={{
          opacity: 1,
          transform: "rotateY(0deg)",
        }}
        exit={{ opacity: 0, transform: "rotateY(90deg)" }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 4,
          delay: index ? index * 0.1 : 0 * 0.1,
        }}
        onClick={() => {
          setNavExpanded(false);
        }}
        className="text-5xl font-bold text-blue-300 hover:text-blue-500 transition-colors duration-200 ease-in-out dark:hover:text-blue-300"
      >
        <Link
          href={href}
          className="font-bold"
        >
          {children}
        </Link>
      </motion.div>
    );
  };

  const NavLinks = [
    { href: "/dev-projects", text: "Development" },
    { href: "/design-projects", text: "Design" },
    { href: "/brb", text: "BRB Stream Screen Customizer" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  return (
    <header className="fixed top-0 z-50 h-[10dvh] min-h-[60px] w-full  bg-gray-950 bg-opacity-90">
      <div className="mx-10 flex h-full flex-row flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => {
            setNavExpanded(false);
          }}
        >
          {`D + H`}
        </Link>

        <button
          className="relative z-50 flex h-[35px] w-[35px] group cursor-pointer flex-row flex-wrap items-center justify-center"
          onClick={() => {
            setNavExpanded(!navExpanded);
          }}
        >
          <motion.div
            className="h-[2px] w-full rounded-full bg-gray-300 group-hover:bg-blue-300 transition duration-200 ease-in-out dark:bg-gray-100 dark:bg-opacity-90"
            transition={{
              duration: 0.2,
            }}
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: navExpanded ? -45 : 0,
              y: navExpanded ? 0 : "-10px",
            }}
            style={{
              position: "absolute",
            }}
          ></motion.div>
          <motion.div
            className="h-[2px] w-full rounded-full bg-gray-300 group-hover:bg-blue-300 transition duration-200 ease-in-out dark:bg-gray-100 dark:bg-opacity-90"
            initial={{
              rotateX: 0,
            }}
            animate={{
              rotateX: navExpanded ? 90 : 0,
            }}
            style={{
              width: navExpanded ? "0" : "100%",
            }}
          ></motion.div>
          <motion.div
            className="h-[2px] w-full rounded-full bg-gray-300 group-hover:bg-blue-300 transition duration-200 ease-in-out dark:bg-gray-100 dark:bg-opacity-90"
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            initial={{
              rotateX: 0,
              opacity: 1,
            }}
            animate={{
              rotate: navExpanded ? 45 : 0,
              y: navExpanded ? 0 : "10px",
            }}
            style={{
              position: "absolute",
            }}
          ></motion.div>
        </button>
      </div>
      <AnimatePresence>
        {navExpanded && (
          <motion.div
            className="z-36 fixed bottom-0 top-0 w-screen bg-blue-950 bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-90"
            initial={{
              opacity: 0,
              y: 100,
              transform: "rotateY(90deg)",
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transform: "rotateY(0deg)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 100,
              transform: "rotateY(90deg)",
              scale: 0.5,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 75,
            }}
          >
            <nav className="d-flex absolute bottom-24 left-10 flex-col items-center justify-center gap-4">
              {NavLinks.map((item, index) => (
                <NavLink href={item.href} key={index} index={index}>
                  {item.text}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
