"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE = new Date("2026-04-25T16:00:00-03:00");

function getTimeLeft(targetDate: Date): TimeLeft {
  const total = targetDate.getTime() - Date.now();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

export function Countdown() {
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(TARGET_DATE)
  );

  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(TARGET_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 flex justify-center gap-3 text-background">
      <TimeBlock value={timeLeft.days} label="dias" />
      <TimeBlock value={timeLeft.hours} label="horas" />
      <TimeBlock value={timeLeft.minutes} label="min" />
      <TimeBlock value={timeLeft.seconds} label="seg" />
    </div>
  );
}

function TimeBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col bg-accent rounded-full p-2 items-center w-[50px]">
      <span className="text-base md:text-lg font-serif leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase text-background">
        {label}
      </span>
    </div>
  );
}
