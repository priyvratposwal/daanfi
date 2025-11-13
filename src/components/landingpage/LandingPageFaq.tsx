import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const LandingPageFaq = (id:any) => {
  const faqItems = [
    {
      id: "1",
      question: "What types of charities can I donate to, and how do I find them?",
      answer: "There are many types of charities out there, ranging from local organizations to large international ones. You can donate to charities that focus on a particular cause, such as animal welfare."
    },
    {
      id: "2",
      question: "Is my donation tax-deductible, and how do I claim it on my taxes?",
      answer: ""
    },
    {
      id: "3", 
      question: "Can I donate anonymously?",
      answer: ""
    },
    {
      id: "4",
      question: "What percentage of my donation actually goes to the charity for administrative?",
      answer: ""
    },
    {
      id: "5",
      question: "Can I donate goods or services instead of money?",
      answer: ""
    }
  ];

  return (
    <div className='flex justify-center items-center'> 
    <section id={id} className="w-[1200px] rounded-2xl py-8 md:py-12 px-4 sm:px-6 h-[900px] bg-[#e8e4d9]">
      <div className="max-w-2xl mx-auto bg-[#e8e4d9] rounded-3xl p-6 md:p-8 lg:p-8">
        {/* Header with decorative image */}
        <div className="text-center mb-8 md:mb-10">
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#d4ed7f] rounded-full"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 md:-translate-y-2">
                <svg width="32" height="40" viewBox="0 0 40 50" fill="none" className="text-gray-800 md:w-10 md:h-12">
                  <path d="M20 5 L25 15 L20 12 L15 15 Z M18 15 C18 20 15 25 15 30 C15 35 18 40 20 45 C22 40 25 35 25 30 C25 25 22 20 22 15" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4">
            Frequently asked questions
          </h1>
          <p className="text-xs md:text-sm text-gray-700">
            Have another question? Email us at{' '}
            <span className="font-medium">pracima.help@gmail.com</span>
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-0 bg-transparent">
              <AccordionTrigger className="text-left hover:no-underline py-3 md:py-4 text-sm md:text-base lg:text-lg font-medium text-gray-900 hover:text-gray-700 [&[data-state=open]>div>svg]:rotate-180">
                <div className="flex items-start justify-between w-full pr-3 md:pr-4">
                  <span className="flex-1 text-left pr-2">{item.question}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0 transition-transform duration-200 mt-0.5 md:mt-1 md:w-5 md:h-5"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 7 L13 10 L10 13 L7 10 Z" fill="currentColor"/>
                  </svg>
                </div>
              </AccordionTrigger>
              {item.answer && (
                <AccordionContent className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed pb-3 md:pb-4 pt-1 md:pt-2">
                  {item.answer}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    </div>
  );
};

export default LandingPageFaq;