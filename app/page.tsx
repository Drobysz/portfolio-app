import { HelpfulLinks, Timeline, Intro } from "./page/index";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "History",
    description: "Here you can review the completed journey that Alexander has taken",
};

export default function Home() {
  return (
    <>
      <Intro />
      <Timeline />
      <HelpfulLinks />
    </>
  );
}
