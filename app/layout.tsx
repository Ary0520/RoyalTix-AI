import Link from 'next/link';
import './globals.css';
import { Web3Provider } from '@/lib/web3-provider';
import { WalletConnect } from '@/components/wallet-connect';
import { BeginnerGuide } from '@/components/beginner-guide';


export const metadata = {
  title: 'RoyalTix AI',
  description: 'AI-powered IP marketplace on Story Protocol',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black overflow-x-hidden">
        <Web3Provider>
          <nav className="bg-black border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                RoyalTix AI
              </Link>
              <div className="flex gap-8 items-center">
                <Link href="/create" className="text-gray-300 hover:text-white transition-colors">
                  Create
                </Link>
                <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                  Marketplace
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <WalletConnect />
              </div>
            </div>
          </nav>
          {children}
          <BeginnerGuide />
        </Web3Provider>
      </body>
    </html>
  );
}