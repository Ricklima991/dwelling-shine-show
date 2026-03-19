import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, BedDouble, ArrowRight } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/imovel/${property.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_30px_-10px_hsl(40_60%_50%/0.15)]">
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                {property.status}
              </span>
            </div>

            {/* Source Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground capitalize">
                {property.source === 'econ' ? 'Econ' : 'Metrocasa'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-gold transition-colors duration-300">
              {property.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{property.subtitle}</p>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                {property.neighborhood}
              </span>
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5 text-gold" />
                {property.bedrooms}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">{property.zone}</span>
              <span className="flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all duration-300">
                Ver detalhes
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
