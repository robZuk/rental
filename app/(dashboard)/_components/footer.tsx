import React from "react";

export function Footer() {
  return (
    <footer className="absolute left-0 z-50 w-full  flex justify-center flex-wrap items-center md:pl-56 h-[100px] bg-background border-t text-sm">
      <p className="">{`Copyright ©${new Date().getFullYear()}`}&nbsp;</p>
      <a href="https://robertzuk.pl">Robet Żuk&nbsp;</a>
      <p> All Rights Reserved.</p>
    </footer>
  );
}
