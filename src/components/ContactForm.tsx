import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  propertyName: string;
}

const ContactForm = ({ propertyName }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Olá, gostaria de saber mais sobre o empreendimento ${propertyName}.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl bg-card border border-border p-6 md:p-8"
    >
      <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
        Entre em Contato
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Preencha o formulário e receba informações exclusivas
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-secondary border-border focus:border-gold"
        />
        <Input
          type="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-secondary border-border focus:border-gold"
        />
        <Input
          type="tel"
          placeholder="Seu telefone (WhatsApp)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="bg-secondary border-border focus:border-gold"
        />
        <Textarea
          placeholder="Sua mensagem"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="bg-secondary border-border focus:border-gold resize-none"
        />
        <Button type="submit" className="w-full gradient-gold text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
          <Send className="mr-2 h-4 w-4" />
          Enviar Mensagem
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-gold" />
          WhatsApp
        </a>
        <a
          href="tel:+5511999999999"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <Phone className="h-4 w-4 text-gold" />
          (11) 99999-9999
        </a>
        <a
          href="mailto:contato@exemplo.com"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <Mail className="h-4 w-4 text-gold" />
          contato@exemplo.com
        </a>
      </div>
    </motion.div>
  );
};

export default ContactForm;
