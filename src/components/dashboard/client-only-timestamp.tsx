"use client";

import { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface ClientOnlyTimestampProps {
  timestamp: string;
  format?: string;
}

export default function ClientOnlyTimestamp({ timestamp, format: formatStr }: ClientOnlyTimestampProps) {
  const [displayTime, setDisplayTime] = useState('');

  useEffect(() => {
    if (formatStr) {
      setDisplayTime(format(new Date(timestamp), formatStr));
    } else {
      setDisplayTime(formatDistanceToNow(new Date(timestamp), { addSuffix: true }));
    }
  }, [timestamp, formatStr]);

  if (!displayTime) {
    // Render nothing on the server and initial client render
    return null;
  }

  return <>{displayTime}</>;
}
