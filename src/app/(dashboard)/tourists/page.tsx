import TouristManagement from "@/components/dashboard/tourist-management";
import { tourists } from "@/lib/data";

export default function TouristsPage() {
  return (
    <div>
       <h1 className="text-3xl font-bold tracking-tight mb-6">Digital ID & Tourist Profiles</h1>
      <TouristManagement tourists={tourists} />
    </div>
  );
}
