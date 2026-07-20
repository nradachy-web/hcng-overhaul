import { Band, Eyebrow } from "@/components/Band";
import { Button, CallButton } from "@/components/Button";
import { CrescentMark } from "@/components/BrassDial";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Band tone="espresso-deep" className="flex min-h-[70svh] items-center">
      <div className="max-w-2xl py-10">
        <span className="text-brass-300">
          <CrescentMark size={36} />
        </span>
        <Eyebrow className="mt-8">Page not found</Eyebrow>
        <h1 className="text-lp-h1 mt-5">
          We could not find that page.
        </h1>
        <p className="text-lead mt-5 text-paper-50/85">
          The office is easier to find. Call us and we will point you the
          right way.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4">
          <CallButton location="body" />
          <Button variant="outline" href="/" arrow>
            Back to home
          </Button>
        </div>
      </div>
    </Band>
  );
}
