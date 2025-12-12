import { HeroSection } from '@/components/hero-section'
import { ThreeDSection } from '@/components/three-d-section'
import { FeaturesCards } from '@/components/features-cards'

export default function HomePage() {
  const threeDLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Technology', href: '#technology' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'About', href: '#about' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      {/* 
          The ThreeDSection is designed to be full screen. 
          We place it below the HeroSection.
      */}
      <ThreeDSection
        title="Create. Register. Earn"
        description="RoyalTix AI transforms how creators monetize AI-generated content. Generate unique artwork using state-of-the-art AI, automatically register it as intellectual property on Story Protocol's blockchain, and earn royalties every time your work is licensed. Permanent IPFS storage ensures your creations are preserved forever. Smart contract licensing means payments happen automatically. From hobbyist to professional, RoyalTix AI gives everyone the tools to truly own their digital creations."
        links={threeDLinks}
      />
      <FeaturesCards />
    </div>
  )
}