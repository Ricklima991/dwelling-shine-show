import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, BedDouble, Building, CheckCircle2, Shield } from "lucide-react";
import { getPropertyBySlug } from "@/data/properties";
import ImageGallery from "@/components/ImageGallery";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";

const PropertyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const property = getPropertyBySlug(slug || "");

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Imóvel não encontrado</h1>
          <Link to="/" className="text-gold hover:underline">Voltar para listagem</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="pt-20 px-4 container mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors py-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para empreendimentos
        </Link>
      </div>

      {/* Gallery */}
      <ImageGallery images={property.images} name={property.name} />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {property.status}
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground capitalize">
                  {property.source === 'econ' ? 'Econ Construtora' : 'Metrocasa'}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground">
                {property.name}
              </h1>
              <p className="mt-2 text-lg text-gold font-serif italic">
                {property.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" />
                  {property.address}
                </span>
                <span className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-gold" />
                  {property.bedrooms}
                </span>
                <span className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gold" />
                  {property.zone}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Sobre o Empreendimento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Diferenciais
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {property.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-card border border-border p-4"
                  >
                    <Shield className="h-5 w-5 text-gold flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Lazer e Infraestrutura
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Localização
              </h2>
              <div className="rounded-xl bg-card border border-border p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium">{property.address}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {property.zone} • {property.neighborhood}
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-64 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                  <iframe
                    title="Localização"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.address)}`}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContactForm propertyName={property.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Imóveis Premium — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetail;
