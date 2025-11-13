import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'

interface Fundraiser {
  id: number
  image: string
  title: string
  description: string
  raised: number
  goal: number
  supporters: number
  category: string
}

const LandingPageThirdSection = (id: any) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const fundraisers: Fundraiser[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      title: 'Help Turkey and Syria Earthquake Relief Fund',
      description: 'Since 2006, SOIL has been working in urban...',
      raised: 90294,
      goal: 100000,
      supporters: 10580,
      category: 'Medical',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop',
      title: 'Help Poor Children with Cancer to Access Treatment',
      description: 'Two powerful earthquakes struck Turkey and...',
      raised: 62786,
      goal: 85000,
      supporters: 8340,
      category: 'Medical',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
      title: 'Provide Gift & food to 700 Street Children',
      description: 'This project will support families in rural and...',
      raised: 54382,
      goal: 10000,
      supporters: 3584,
      category: 'Food Security',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
      title: 'Provide Gift & food to 700 Street Children',
      description: 'This project will support families in rural and...',
      raised: 54382,
      goal: 10000,
      supporters: 3584,
      category: 'Food Security',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop',
      title: 'Provide Gift & food to 700 Street Children',
      description: 'This project will support families in rural and...',
      raised: 54382,
      goal: 10000,
      supporters: 3584,
      category: 'Food Security',
    },
  ]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? fundraisers.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === fundraisers.length - 1 ? 0 : prev + 1))
  }

  const getVisibleFundraisers = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % fundraisers.length
      visible.push(fundraisers[index])
    }
    return visible
  }

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <section id={id}>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Fundraisers In Extreme Need</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevious} className="rounded-full w-12 h-12 border-2">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full w-12 h-12 border-2">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getVisibleFundraisers().map((fundraiser) => (
            <Card key={fundraiser?.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img src={fundraiser?.image} alt={fundraiser?.title} className="w-full h-full object-cover grayscale" />
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">{fundraiser?.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">{fundraiser?.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">{formatCurrency(fundraiser.raised)}</span>
                    <span className="text-sm text-gray-600">raised of {formatCurrency(fundraiser.goal)} goal</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-lime-400 transition-all duration-300"
                      style={{ width: `${calculateProgress(fundraiser.raised, fundraiser.goal)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                    <span className="text-gray-600">{formatNumber(fundraiser.supporters)} Supporters</span>
                  </div>
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    {fundraiser?.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingPageThirdSection
