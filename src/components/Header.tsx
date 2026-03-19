import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Building2 className="h-6 w-6 text-gold" />
          <span className="font-serif text-xl font-semibold text-foreground group-hover:text-gold transition-colors">
            Imóveis Premium
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            Empreendimentos
          </Link>
          <a href="#contato" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            Contato
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
