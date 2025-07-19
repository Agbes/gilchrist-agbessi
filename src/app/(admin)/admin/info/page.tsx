import ContactInfoTable from "@/components/Admin/Info/ContactInfoTable";
import SocialPlatformTable from "@/components/Admin/Info/SocialTable";

export default function AdminInfoPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Informations du site</h1>

      <SocialPlatformTable />
      <ContactInfoTable />
    </div>
  );
}
