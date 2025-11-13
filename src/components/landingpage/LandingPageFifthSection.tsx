import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import LandingPageCardLeft from './LandingPageCardLeft' // Adjust import path as needed

interface LandingPageFifthsectionProps {
  id?: string
}

export default function LandingPageFifthSection({ id }: LandingPageFifthsectionProps)  {
  const teamMembers = [
    {
      name: 'Abhishek Singh',
      role: 'Founder Practina',
    },
    {
      name: 'Arun Prajapati',
      role: 'Product Manager',
    },
    {
      name: 'Kaushiki Mishra',
      role: 'Lead Marketing',
    },
    {
      name: 'Mayank Bhardwaj',
      role: 'Creative Designer',
    },
  ]

  return (
    <section id={id} className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet our team</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The world's largest social fundraising platform, optimized for your charity in a more easy way
          </p>
        </div>

        {/* Separator */}
        <Separator className="mb-12 bg-gray-300 h-0.5" />

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {teamMembers.map((member, index) => (
            <LandingPageCardLeft
              key={index}
              width={270}
              height={300}
              title={member.name}
              description={member.role}
              showDonateButton={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

