import { useEffect, useState } from 'react';
import { 
  Building2, 
  Shield, 
  Users, 
  BookOpen, 
  Clock,
  Home,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Intersection Observer for scroll animations
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.85) {
          const id = el.getAttribute('data-animate');
          if (id) {
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        }
      });
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:shadow-white/20 transition-all duration-300">
                <Building2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">The Community</h1>
                <p className="text-xs text-gray-400">Tourism Welcome Center</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              {['about', 'rules', 'life', 'contact'].map((section) => (
                <button 
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-400 hover:text-white transition-all duration-300 text-sm relative group"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full mb-6 border border-white/10 backdrop-blur-sm animate-fadeIn hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <Shield className="w-4 h-4 text-white animate-pulse-slow" />
              <span className="text-sm text-gray-300">Established for Order and Safety</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fadeInUp">
              Welcome to<br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse-slow">
                The Community
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeInUp delay-200 leading-relaxed">
              So basically, our community is super safe and organized. Everyone follows the same rules 
              and does their assigned jobs, which keeps everything running smoothly. It's pretty efficient 
              when you think about it.
            </p>
            <button 
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-white/20 hover:scale-105 animate-scaleIn delay-300 group"
            >
              <span>Learn More</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 bg-white/5 relative dot-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-animate="about-header">
            <h2 className={`text-4xl md:text-5xl font-bold mb-3 text-white transition-all duration-700 ${
              isVisible['about-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>About Our Community</h2>
            <p className={`text-lg text-gray-300 transition-all duration-700 delay-200 ${
              isVisible['about-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>
              The community is built on three core principles that maintain harmony and order
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Shield,
                title: "Safety First",
                desc: "Nobody gets hurt here. There's no conflict or violence, and everyone always has what they need. You don't have to worry about anything bad happening because everything is controlled.",
                delay: "delay-100"
              },
              {
                icon: Users,
                title: "Sameness",
                desc: "Everyone is treated equally, which eliminates jealousy and competition. The Committee of Elders makes all major decisions, so citizens don't have to stress about complex choices.",
                delay: "delay-300"
              },
              {
                icon: BookOpen,
                title: "Perfect Organization",
                desc: "Your entire life path is planned from birth to Release. Everyone gets assigned a job based on their abilities, and you always know exactly what you're supposed to be doing.",
                delay: "delay-500"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                data-animate={`card-${idx}`}
                className={`p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-2xl group ${
                  isVisible[`card-${idx}`] ? `animate-fadeInUp ${item.delay}` : 'opacity-0'
                }`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/20 transition-all duration-500 group-hover:scale-110">
                  <item.icon className="w-6 h-6 text-white transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div 
            data-animate="highlight-box"
            className={`p-8 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/[0.15] hover:scale-[1.02] ${
              isVisible['highlight-box'] ? 'animate-scaleIn' : 'opacity-0'
            }`}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">What Makes Us Different</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              We've eliminated pain, suffering, and basically all uncertainty. Everyone's content 
              because life is structured and predictable. When you don't have to constantly make 
              difficult decisions, everything becomes simpler and more peaceful.
            </p>
            <ul className="space-y-2 text-gray-300">
              {[
                "Precise language is required to prevent misunderstandings",
                "Climate control ensures perfect weather conditions",
                "The Elders observe your development and assign the ideal job",
                "Equal distribution means no one feels disadvantaged"
              ].map((item, idx) => (
                <li 
                  key={idx}
                  className="flex items-start space-x-2 hover:text-white transition-all duration-500 ease-in-out hover:translate-x-2"
                >
                  <span className="text-white mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-animate="rules-header">
            <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full mb-4 border border-white/20 backdrop-blur-sm transition-all duration-700 hover:bg-white/10 ${
              isVisible['rules-header'] ? 'animate-fadeIn' : 'opacity-0'
            }`}>
              <AlertCircle className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm text-gray-300">Important Guidelines</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-3 text-white transition-all duration-700 ${
              isVisible['rules-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>Community Rules</h2>
            <p className={`text-lg text-gray-300 transition-all duration-700 delay-200 ${
              isVisible['rules-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>
              These are the essential rules everyone must follow. If you visit, you'll need to comply with these regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              {
                num: "1",
                title: "Precise Language",
                desc: "You must say exactly what you mean—no exaggerations or lies. If you misspeak, you're required to apologize immediately and clarify your statement.",
                color: "white"
              },
              {
                num: "2",
                title: "Share Feelings",
                desc: "Every evening, families discuss their feelings from the day. This helps identify any issues that need addressing and maintains emotional stability.",
                color: "white"
              },
              {
                num: "3",
                title: "No Personal Property",
                desc: "You only receive items distributed by the community. Bicycles are assigned by age group. Nothing from outside is permitted.",
                color: "white"
              },
              {
                num: "4",
                title: "Dream Telling",
                desc: "Each morning, you share your dreams with your family unit. If you experience Stirrings, you must report them to receive appropriate medication.",
                color: "white"
              },
              {
                num: "5",
                title: "Respect Protocol",
                desc: "Always maintain politeness and use proper titles. Rudeness requires a public apology, and all infractions are recorded permanently.",
                color: "white"
              },
              {
                num: "6",
                title: "Strict Scheduling",
                desc: "Everything operates on schedule—meals, volunteer hours, ceremonies. Being late necessitates a formal apology and explanation.",
                color: "white"
              }
            ].map((rule, idx) => (
              <div 
                key={idx}
                data-animate={`rule-${idx}`}
                className={`p-5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-xl group ${
                  isVisible[`rule-${idx}`] ? `animate-slideInLeft delay-${idx * 100}` : 'opacity-0'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold text-sm">{rule.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">{rule.title}</h3>
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            data-animate="warning-box"
            className={`p-6 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 ${
              isVisible['warning-box'] ? 'animate-scaleIn' : 'opacity-0'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-white flex-shrink-0 mt-1 animate-pulse-slow" />
              <div>
                <h4 className="font-bold text-lg text-white mb-2">Consequences of Rule Violations</h4>
                <p className="text-gray-300">
                  Three major infractions result in Release. The Committee of Elders maintains 
                  detailed records of all violations. Compliance with regulations is essential 
                  for maintaining the community's peace and organizational structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Life */}
      <section id="life" className="py-16 px-6 bg-white/5 relative dot-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12" data-animate="life-header">
            <h2 className={`text-4xl md:text-5xl font-bold mb-3 text-white transition-all duration-700 ${
              isVisible['life-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>A Typical Day</h2>
            <p className={`text-lg text-gray-300 transition-all duration-700 delay-200 ${
              isVisible['life-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>
              This is the daily schedule everyone follows. Consistency keeps the community functioning efficiently.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {[
              {
                icon: Clock,
                title: "Morning (6:30 - 8:00)",
                desc: "Morning chimes wake everyone simultaneously. You share dreams with your family unit and take required medication. Breakfast is served at exactly 7:00. School or work begins at 8:00.",
                delay: "delay-100"
              },
              {
                icon: BookOpen,
                title: "School & Work (8:00 - 4:00)",
                desc: "Children attend school organized by age groups. Adults perform their assigned occupations. Midday meal is served at noon for all citizens.",
                delay: "delay-200"
              },
              {
                icon: Users,
                title: "Volunteer Hours (4:00 - 6:00)",
                desc: "All children complete volunteer service. During this period, the Elders observe to determine appropriate job assignments for the Ceremony of Twelve.",
                delay: "delay-300"
              },
              {
                icon: Home,
                title: "Evening (6:00 - 9:00)",
                desc: "Family units gather for dinner at 6:30. Afterward, everyone participates in the evening ritual of sharing feelings. Recreational time until 9:00, then lights out at 9:30.",
                delay: "delay-400"
              }
            ].map((schedule, idx) => (
              <div 
                key={idx}
                data-animate={`schedule-${idx}`}
                className={`flex items-start space-x-4 p-5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:translate-x-2 group ${
                  isVisible[`schedule-${idx}`] ? `animate-slideInRight ${schedule.delay}` : 'opacity-0'
                }`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <schedule.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white mb-1 group-hover:text-gray-100 transition-colors duration-300">{schedule.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {schedule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div 
              data-animate="ceremonies"
              className={`p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:scale-105 ${
                isVisible['ceremonies'] ? 'animate-scaleIn' : 'opacity-0'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-4">Key Ceremonies</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  { title: "Naming", desc: "Infants receive names and family assignments" },
                  { title: "Ceremony of Twelve", desc: "Job assignments are announced" },
                  { title: "Matching", desc: "The Elders select compatible spouses" },
                  { title: "Release", desc: "Elderly citizens complete their life cycle" }
                ].map((ceremony, idx) => (
                  <li key={idx} className="hover:text-white transition-all duration-500 ease-in-out hover:translate-x-2">
                    <strong className="text-white">{ceremony.title}:</strong> {ceremony.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div 
              data-animate="buildings"
              className={`p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:scale-105 ${
                isVisible['buildings'] ? 'animate-scaleIn delay-200' : 'opacity-0'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-4">Essential Facilities</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  { title: "Nurturing Center", desc: "Infant care and development" },
                  { title: "House of the Old", desc: "Elder citizen residence" },
                  { title: "Bicycle Repair", desc: "Maintains community transportation" },
                  { title: "Food Distribution", desc: "Manages nutritional allocation" }
                ].map((building, idx) => (
                  <li key={idx} className="hover:text-white transition-all duration-500 ease-in-out hover:translate-x-2">
                    <strong className="text-white">{building.title}:</strong> {building.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div data-animate="contact-header">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-white transition-all duration-700 ${
              isVisible['contact-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>Visitor Information</h2>
            <p className={`text-xl text-gray-300 mb-10 transition-all duration-700 delay-200 ${
              isVisible['contact-header'] ? 'animate-fadeInUp' : 'opacity-0'
            }`}>
              Tours are available if you'd like to observe our organizational systems. 
              Contact the Committee of Elders to schedule your visit.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Building2, title: "Location", info: "Central Plaza, Building 7", delay: "delay-100" },
              { icon: Clock, title: "Hours", info: "8:00 AM - 4:00 PM Daily", delay: "delay-300" },
              { icon: Users, title: "Inquiries", info: "Contact any Elder", delay: "delay-500" }
            ].map((contact, idx) => (
              <div 
                key={idx}
                data-animate={`contact-${idx}`}
                className={`p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out hover:bg-white/10 hover:border-white/20 hover:scale-110 hover:shadow-2xl group ${
                  isVisible[`contact-${idx}`] ? `animate-scaleIn ${contact.delay}` : 'opacity-0'
                }`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-gray-100 transition-colors duration-300">{contact.title}</h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{contact.info}</p>
              </div>
            ))}
          </div>

          <div 
            data-animate="footer"
            className={`pt-6 border-t border-white/10 transition-all duration-700 ${
              isVisible['footer'] ? 'animate-fadeIn' : 'opacity-0'
            }`}
          >
            <p className="text-gray-500 text-sm">
              The Community — Maintained by the Committee of Elders
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white">The Community</h3>
                  <p className="text-xs text-gray-500">Tourism Welcome Center</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Experience perfect order and safety in our organized society where Sameness ensures harmony for all.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                {['about', 'rules', 'life', 'contact'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Info */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white transition-colors duration-300">Central Plaza, Building 7</li>
                <li className="hover:text-white transition-colors duration-300">Hours: 8:00 AM - 4:00 PM</li>
                <li className="hover:text-white transition-colors duration-300">Contact: Committee of Elders</li>
                <li className="hover:text-white transition-colors duration-300">Tours Available Daily</li>
              </ul>
            </div>

            {/* Principles */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Core Principles</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <span className="hover:text-white transition-colors duration-300">Safety & Security</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <span className="hover:text-white transition-colors duration-300">Perfect Equality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                  <span className="hover:text-white transition-colors duration-300">Structured Organization</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} The Community. Maintained by the Committee of Elders.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">Precision Language Required</span>
              <span className="hover:text-white transition-colors duration-300 cursor-pointer">All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
