import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Me{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            contacter
          </span>
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
