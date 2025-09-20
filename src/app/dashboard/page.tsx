"use client";

import MapView from '@/components/dashboard/map-view';
import AlertConsole from '@/components/dashboard/alert-console';
import { tourists, patrolUnits, initialAlerts, zones } from '@/lib/data';

export default function Dashboard() {
  return (
    <div className="grid h-full max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] items-start gap-4 lg:grid-cols-5 xl:grid-cols-3">
      <div className="h-full lg:col-span-3 xl:col-span-2">
        <MapView tourists={tourists} patrolUnits={patrolUnits} zones={zones} />
      </div>
      <div className="h-full lg:col-span-2 xl:col-span-1">
        <AlertConsole initialAlerts={initialAlerts} allTourists={tourists} />
      </div>
    </div>
  );
}
