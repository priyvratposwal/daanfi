import React from 'react'
import { Button } from '@/components/ui/button'
import LandingPageCardLeft from './LandingPageCardLeft'
import LandingPageCardRight from './LandingPageCardRight'
import LandingPageCard from './LandingPageCard'
import { Navigate, useNavigate } from 'react-router'

interface LandingPageFirstSectionProps {
  id?: string;
}

export default function LandingPageFirstSection({ id }: LandingPageFirstSectionProps) {
  const navigate = useNavigate()
  return (
    <section id={id}>
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Lime Green Background Splash - More prominent */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-[500px] h-[500px] rounded-full bg-lime-200/60 blur-[100px] z-0"
          style={{
            background:
              'radial-gradient(circle, rgba(190, 242, 100, 0.6) 0%, rgba(190, 242, 100, 0.3) 50%, rgba(190, 242, 100, 0.1) 100%)',
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] leading-tight font-serif font-bold text-gray-900 mb-6">
              Great futures are built
              <br />
              with a small charity
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              The world's largest social fundraising platform,
              <br />
              optimized for your charity in a more easy way
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white rounded-full px-10 py-6 text-base font-medium"
                //@ts-ignore
                onClick={() => {
                  navigate('/dashboard')
                }}
              >
                Donate now
              </Button>
              {/* <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 rounded-full px-10 py-6 text-base font-medium bg-white"
            >
              <span className="mr-2">▶</span> Watch Video
            </Button> */}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col">
              <div>
                <LandingPageCardLeft
                  width={200}
                  height={400}
                title="40%
"
                  description="Funds allocated to support
employee medical emergencies,
short-term financial aid,
and mental-health assistance.
"
                />
              </div>
              <div className="mt-2">
                <LandingPageCard text='Amplift Their Story' />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mt-[110px]">
                <LandingPageCardLeft
                  width={200}
                  height={400}
                  title="28%"
                  description="Internal contributions directed
towards skill development,
certifications, and
employee children’s education support."
                />
              </div>
            </div>
            <div>
              <div className="mt-[330px]">
                <LandingPageCard text='Let Them Be Heard' />
              </div>
            </div>
            <div className="mt-[110px]">
              <LandingPageCardLeft
                width={200}
                height={400}
                title="65%"
                description="
Funds used for internal CSR
initiatives, eco-projects,
and workplace improvement
for a better environment.
"
              />
            </div>
            <div>
              <div className="ml-18">
                <LandingPageCardLeft
                  width={200}
                  height={400}
                  title="52%"
                  description="Funds used for internal CSR
initiatives, eco-projects,
and workplace improvement
for a better environment.
"
                />
              </div>
              <div className="mt-2">
                <LandingPageCard text='Be Their Voice' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
