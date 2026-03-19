import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import Header from "@/components/Header";

const Index = () => {
  const [search, setSearch] = useState("");
  const [filterZone, setFilterZone] = useState("all");
  const [filterSource, setFilterSource] = useState("all");

  const zones = ["all", ...Array.from(new Set(properties.map(p => p.zone)))];

  const filtered = properties.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(search.toLowerCase());
    const matchesZone = filterZone === "all" || p.zone === filterZone;
    const matchesSource = filterSource === "all" || p.source === filterSource;
    return matchesSearch && matchesZone && matchesSource;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="absolute inset-0 gradient-dark" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Encontre seu <span className="text-gradient-gold">imóvel ideal</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Empreendimentos selecionados em São Paulo com as melhores condições de financiamento
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-2">
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar empreendimento ou bairro..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              {zones.map(zone => (
                <button
                  key={zone}
                  onClick={() => setFilterZone(zone)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    filterZone === zone
                      ? "bg-gold text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {zone === "all" ? "Todos" : zone}
                </button>
              ))}
              <span className="mx-1 text-border">|</span>
              {["all", "econ", "metrocasa"].map(src => (
                <button
                  key={src}
                  onClick={() => setFilterSource(src)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    filterSource === src
                      ? "bg-gold text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {src === "all" ? "Todas" : src === "econ" ? "Econ" : "Metrocasa"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} empreendimento{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-serif text-xl text-foreground">Nenhum empreendimento encontrado</h3>
            <p className="mt-2 text-sm text-muted-foreground">Tente ajustar seus filtros de busca</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
