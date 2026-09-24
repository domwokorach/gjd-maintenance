import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { HomeCTA } from "@/components/home/home-cta"

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyChooseUs />
      <HomeCTA />
    </>
  )
}
