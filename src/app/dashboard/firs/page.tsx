
"use client";

import { useFIRs } from "@/contexts/fir-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
import ClientOnlyTimestamp from "@/components/dashboard/client-only-timestamp";

export default function FiledFIRsPage() {
  const { firs } = useFIRs();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Filed E-FIRs</h1>
      <Card>
        <CardHeader>
          <CardTitle>E-FIR Repository</CardTitle>
          <CardDescription>
            A log of all Electronic First Information Reports filed on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {firs.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-20rem)]">
                <Accordion type="single" collapsible className="w-full">
                {firs.map((fir) => (
                    <AccordionItem key={fir.id} value={fir.id}>
                    <AccordionTrigger>
                        <div className="flex justify-between w-full pr-4 items-center">
                            <div className="text-left">
                                <p className="font-semibold">Incident: {fir.alertId}</p>
                                <p className="text-sm text-muted-foreground">Tourist: {fir.touristName} | Type: {fir.incidentType}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <ClientOnlyTimestamp timestamp={fir.timestamp} />
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
                        {fir.firText}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-lg">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No FIRs Filed Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                    When you generate and file an E-FIR from the alert console, it will appear here.
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
