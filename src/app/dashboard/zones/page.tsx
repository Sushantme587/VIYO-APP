import ZoneManagement from '@/components/dashboard/zone-management';
import { zones } from '@/lib/data';

export default function ZonesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-6">Zone Management</h1>
      <ZoneManagement initialZones={zones} />
    </div>
  );
}
