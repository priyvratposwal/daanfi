import Footer from "@/components/Footer";
import LandingaPageSecondSection from "@/components/landingpage/LandingaPageSecondSection";
import LandingPageFaq from "@/components/landingpage/LandingPageFaq";
import LandingPageFifthSection from "@/components/landingpage/LandingPageFifthSection";
import LandingPageFirstSection from "@/components/landingpage/LandingPageFirstSection";
import LandingPageFourthSection from "@/components/landingpage/LandingPageFourthSection";
import LandingPageThirdSection from "@/components/landingpage/LandingPageThirdSection";
import { Navbar } from "@/components/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <LandingPageFirstSection id="home" />
      <LandingaPageSecondSection id="about" />
      <LandingPageThirdSection id="features" />
      <LandingPageFourthSection id="how-it-works" />
      <LandingPageFifthSection id="contact" />
      <LandingPageFaq id="faq" />
      <Footer />
    </div>
  );
};
export default LandingPage;
