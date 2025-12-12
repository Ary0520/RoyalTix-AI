'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export function HeroSection() {
    return (
        <main className="overflow-x-hidden bg-black text-white">
            <section>
                <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-24">
                    <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                        <div className="relative z-10 mx-auto text-center lg:ml-0 lg:w-[55%] lg:text-left">
                            <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl text-white">
                                RoyalTix AI
                            </h1>
                            <p className="mt-8 text-pretty text-lg text-gray-300 leading-relaxed">
                                RoyalTix AI turns every piece of AI-generated content into a registered intellectual property asset on Story Protocol. Generate content, lock in ownership, and earn automatic royalties—all in one platform.
                            </p>

                            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                <Button
                                    asChild
                                    size="lg"
                                    className="px-5 text-base bg-white text-black hover:bg-gray-200">
                                    <Link href="/create">
                                        <span className="text-nowrap">Start Creating</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="px-5 text-base text-white hover:bg-white/10">
                                    <a href="https://docs.story.foundation/developers/typescript-sdk/register-ip-asset" target="_blank" rel="noopener noreferrer">
                                        <span className="text-nowrap">See Docs🔥</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <img
                            className="pointer-events-none order-first ml-auto h-56 w-full object-cover sm:h-96 lg:absolute lg:inset-0 lg:-right-10 lg:-top-80 lg:order-last lg:h-max lg:w-1/2 lg:object-contain"
                            src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                            alt="Abstract Object"
                            height="4000"
                            width="3000"
                        />
                    </div>
                </div>
            </section>
            <section className="bg-black pb-16 md:pb-32">
                <div className="group relative m-auto max-w-6xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-44 md:border-r md:border-gray-700 md:pr-6">
                            <p className="text-end text-sm text-gray-400">Technologies Used</p>
                        </div>
                        <div className="relative py-6 md:w-[calc(100%-11rem)]">
                            <InfiniteSlider
                                speedOnHover={20}
                                speed={40}
                                gap={112}>
                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">🤗 Hugging Face</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">📖 Story Protocol</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">⚛️ Next.js</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">📁 IPFS</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">🔗 Viem</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">🎨 TailwindCSS</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">📌 Pinata</span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-white font-semibold text-lg">⚡ TypeScript</span>
                                </div>
                            </InfiniteSlider>

                            <div className="bg-gradient-to-r from-black absolute inset-y-0 left-0 w-20"></div>
                            <div className="bg-gradient-to-l from-black absolute inset-y-0 right-0 w-20"></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
