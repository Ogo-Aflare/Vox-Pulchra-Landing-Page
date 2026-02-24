import { useEffect, useRef, useState } from 'react';
import { Music, Mic2, Heart, BookOpen, Users, Sparkles, Calendar, Phone, Instagram, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto container-padding flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/F74FF260-CC68-44BE-8293-40C936E1249C.jpg"
              alt="Vox Pulchra"
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('origin')} className="text-sm text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors">
              Our Story
            </button>
            <button onClick={() => scrollToSection('mission')} className="text-sm text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors">
              Mission
            </button>
            <button onClick={() => scrollToSection('gatherings')} className="text-sm text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors">
              Gatherings
            </button>
            <button onClick={() => scrollToSection('join')} className="text-sm text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors">
              Join Us
            </button>
          </div>
          <Button
            onClick={() => scrollToSection('join')}
            className="bg-[hsl(43,70%,55%)] text-[hsl(260,30%,8%)] hover:bg-[hsl(43,70%,65%)] font-medium"
          >
            Join Vox Pulchra
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(270,50%,35%)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(43,70%,55%)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto container-padding text-center pt-20">
          <div className={`transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <img
              src="/images/F74FF260-CC68-44BE-8293-40C936E1249C.jpg"
              alt="Vox Pulchra Logo"
              className="h-32 md:h-40 w-auto mx-auto mb-8"
            />
          </div>

          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-light italic text-cream mb-6 transition-all duration-1000 delay-200 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Where Your Voice Becomes
            <br />
            <span className="text-gradient-gold">Who You Are Meant to Be</span>
          </h1>

          <div
            className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${
              isVisible('hero') ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="divider-gold" />
          </div>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            A faith-driven community raising confident, skilled, disciplined, and self-aware vocalists
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
              isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('join')}
              className="bg-[hsl(43,70%,55%)] text-[hsl(260,30%,8%)] hover:bg-[hsl(43,70%,65%)] font-medium px-8"
            >
              Join the Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('origin')}
              className="border-[hsl(43,70%,55%)]/40 text-[hsl(43,70%,55%)] hover:bg-[hsl(43,70%,55%)]/10"
            >
              Discover Our Story
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[hsl(43,70%,55%)]/60" />
        </div>
      </section>

      {/* Origin Story Section */}
      <section id="origin" className="section-padding bg-gradient-section">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible('origin') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[hsl(43,70%,55%)]/20 to-[hsl(270,50%,35%)]/20 rounded-2xl blur-xl" />
                <img
                  src="/images/58A8FDA0-D9B8-4038-BF61-78BC388384FF.jpg"
                  alt="Founder of Vox Pulchra"
                  className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible('origin') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
                Our Origin
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-cream mb-6">
                The Question That Changed Everything
              </h2>
              <div className="divider-gold mb-8" />

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p className="text-lg italic text-cream/90">
                  "There comes a moment in every singer's life when the question shifts.
                </p>
                <p>
                  It is no longer, <span className="text-[hsl(43,70%,55%)]">"Can I sing?"</span>
                  <br />
                  It becomes, <span className="text-[hsl(43,70%,55%)]">"What is my voice truly for?"</span>
                </p>
                <p>
                  Your voice is more than sound. It is identity. It is responsibility. It is influence. 
                  It carries emotion, conviction, and belief.
                </p>
                <p>
                  <span className="text-cream">Vox Pulchra</span> — meaning <span className="italic">Beautiful Voice</span> — was born from this understanding.
                </p>
                <p>
                  I founded Vox Pulchra because I saw something missing. Many singers have talent. 
                  Few have structure. Many have passion. Few have discipline. Many can perform. 
                  Few understand their voice deeply — both technically and spiritually.
                </p>
                <p className="text-cream/90 font-medium">
                  Vox Pulchra is not just a singing group. It is a faith-driven community raising 
                  confident, skilled, disciplined, and self-aware vocalists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[hsl(270,50%,20%)]/30 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto container-padding relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
              Our Purpose
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-cream mb-6">
              Our Mission
            </h2>
            <div className="divider-gold mx-auto mb-8" />
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(43,70%,55%)]/20">
              <p className="text-xl md:text-2xl text-cream/90 leading-relaxed text-center mb-8">
                To raise vocalists who are <span className="text-[hsl(43,70%,55%)]">technically excellent</span>,{' '}
                <span className="text-[hsl(43,70%,55%)]">spiritually grounded</span>,{' '}
                <span className="text-[hsl(43,70%,55%)]">emotionally intelligent</span>, and{' '}
                <span className="text-[hsl(43,70%,55%)]">personally disciplined</span> — singers who 
                understand that their voice is both a gift and a calling.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(43,70%,55%)]/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-[hsl(43,70%,55%)]" />
                  </div>
                  <h3 className="text-xl font-medium text-cream mb-2">Character</h3>
                  <p className="text-muted-foreground text-sm">
                    A beautiful voice is not only about tone. It is about character.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(43,70%,55%)]/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[hsl(43,70%,55%)]" />
                  </div>
                  <h3 className="text-xl font-medium text-cream mb-2">Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    We believe in continuous growth and transformation.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[hsl(43,70%,55%)]/10 flex items-center justify-center">
                    <Music className="w-8 h-8 text-[hsl(43,70%,55%)]" />
                  </div>
                  <h3 className="text-xl font-medium text-cream mb-2">Stewardship</h3>
                  <p className="text-muted-foreground text-sm">
                    Your voice is a gift to be nurtured and shared wisely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section id="build" className="section-padding bg-gradient-section">
        <div className="max-w-6xl mx-auto container-padding">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('build') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
              Foundations
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-cream mb-6">
              What We Build Here
            </h2>
            <div className="divider-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic2,
                title: 'Vocal Training & Technique',
                description: 'Because passion without skill leads to frustration.',
              },
              {
                icon: Heart,
                title: 'Vocal Health & Warm-ups',
                description: 'Because discipline protects longevity.',
              },
              {
                icon: BookOpen,
                title: 'Songwriting',
                description: 'Because your story deserves language.',
              },
              {
                icon: Users,
                title: 'Handling Criticism',
                description: 'Because every serious vocalist must grow beyond applause.',
              },
              {
                icon: Sparkles,
                title: 'Spiritual Depth in Worship',
                description: 'Because sound without substance fades.',
              },
              {
                icon: Music,
                title: 'Personal Growth & Discipline',
                description: 'Because the singer and the person cannot be separated.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`group bg-[hsl(260,25%,12%)] rounded-xl p-6 border border-[hsl(43,70%,55%)]/10 hover:border-[hsl(43,70%,55%)]/40 transition-all duration-500 hover:-translate-y-1 ${
                  isVisible('build') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-[hsl(43,70%,55%)]/10 flex items-center justify-center mb-4 group-hover:bg-[hsl(43,70%,55%)]/20 transition-colors">
                  <item.icon className="w-6 h-6 text-[hsl(43,70%,55%)]" />
                </div>
                <h3 className="text-lg font-medium text-cream mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 text-center transition-all duration-1000 delay-700 ${
              isVisible('build') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-cream/80 italic text-lg">
              We are intentional. We take growth seriously. And we respect the process.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section id="different" className="section-padding bg-background">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible('different') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
                Our Approach
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-cream mb-6">
                What Makes Vox Pulchra Different
              </h2>
              <div className="divider-gold mb-8" />

              <div className="space-y-6">
                <p className="text-xl text-cream/90">
                  We are not building performers. We are building{' '}
                  <span className="text-[hsl(43,70%,55%)]">voices that carry weight</span>.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Here, we do not chase trends. We pursue depth. We ask better questions. 
                  We confront weaknesses. We refine strengths. We value consistency over noise.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  In a world that rewards visibility, Vox Pulchra rewards{' '}
                  <span className="text-cream">development</span>.
                </p>

                <div className="bg-[hsl(260,25%,12%)] rounded-xl p-6 border border-[hsl(43,70%,55%)]/20 mt-8">
                  <p className="text-cream font-medium mb-4">This is a space where you can:</p>
                  <ul className="space-y-3">
                    {[
                      'Grow without pretending',
                      'Learn without shame',
                      'Be corrected without being diminished',
                      'Worship without performance pressure',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(43,70%,55%)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-cream/80 italic">
                  We understand that technique matters. But so does identity. 
                  And when both align, something powerful happens.
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible('different') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-[hsl(43,70%,55%)]/10 to-[hsl(270,50%,35%)]/20 rounded-3xl blur-2xl" />
                <div className="relative space-y-6">
                  <div className="bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-2xl p-8 border border-[hsl(43,70%,55%)]/20">
                    <div className="text-5xl font-light text-[hsl(43,70%,55%)] mb-2">01</div>
                    <h3 className="text-xl font-medium text-cream mb-2">Depth Over Hype</h3>
                    <p className="text-muted-foreground text-sm">
                      We prioritize substance and meaningful growth over fleeting attention.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-2xl p-8 border border-[hsl(43,70%,55%)]/20 ml-8">
                    <div className="text-5xl font-light text-[hsl(43,70%,55%)] mb-2">02</div>
                    <h3 className="text-xl font-medium text-cream mb-2">Community Over Competition</h3>
                    <p className="text-muted-foreground text-sm">
                      We build each other up in an environment of mutual support.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-2xl p-8 border border-[hsl(43,70%,55%)]/20">
                    <div className="text-5xl font-light text-[hsl(43,70%,55%)] mb-2">03</div>
                    <h3 className="text-xl font-medium text-cream mb-2">Purpose Over Performance</h3>
                    <p className="text-muted-foreground text-sm">
                      We sing from a place of calling, not just capability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gatherings Section */}
      <section id="gatherings" className="section-padding bg-gradient-section">
        <div className="max-w-6xl mx-auto container-padding">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('gatherings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
              Our Rhythm
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-cream mb-6">
              Our Gatherings
            </h2>
            <div className="divider-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every structure shapes growth. That is why we meet intentionally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Worship Session */}
            <div
              className={`group transition-all duration-1000 delay-200 ${
                isVisible('gatherings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[hsl(43,70%,55%)]/20 hover:border-[hsl(43,70%,55%)]/40 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/DCC24672-025D-4125-8C74-43B36DF0ED89.jpg"
                    alt="Worship with Vox Pulchra"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260,30%,8%)] via-[hsl(260,30%,8%)]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-[hsl(43,70%,55%)] text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    Every Saturday at 9PM
                  </div>
                  <h3 className="text-2xl font-medium text-cream mb-2">Worship with Vox Pulchra</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our Saturday worship sessions are moments of alignment. Here, we quiet distractions 
                    and remember why we sing in the first place.
                  </p>
                </div>
              </div>
            </div>

            {/* Vocalist's Journey */}
            <div
              className={`group transition-all duration-1000 delay-400 ${
                isVisible('gatherings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[hsl(43,70%,55%)]/20 hover:border-[hsl(43,70%,55%)]/40 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/7E65C332-CFD8-4F0A-95CF-59856A3485F3.jpg"
                    alt="The Vocalist's Journey"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260,30%,8%)] via-[hsl(260,30%,8%)]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-[hsl(43,70%,55%)] text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    Every Friday at 9PM
                  </div>
                  <h3 className="text-2xl font-medium text-cream mb-2">The Vocalist's Journey</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our Friday learning sessions are dedicated to training, teaching, and sharpening. 
                    This is where we break down technique and develop discipline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-12 text-center transition-all duration-1000 delay-600 ${
              isVisible('gatherings') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-cream/80 italic text-lg max-w-2xl mx-auto">
              Together, these rhythms form a system of growth — spiritual and practical.
            </p>
          </div>
        </div>
      </section>

      {/* What You Gain Section */}
      <section id="gain" className="section-padding bg-background">
        <div className="max-w-6xl mx-auto container-padding">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible('gain') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
              The Journey
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-cream mb-6">
              What You Gain
            </h2>
            <div className="divider-gold mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When you join Vox Pulchra, you gain more than access. You gain transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Technical Confidence',
                description: 'Rooted in deep understanding of your instrument.',
              },
              {
                title: 'Emotional Resilience',
                description: 'The ability to face criticism and grow from it.',
              },
              {
                title: 'Vocal Identity',
                description: 'Clarity about who you are as a vocalist.',
              },
              {
                title: 'Disciplined Growth',
                description: 'A structured approach to continuous improvement.',
              },
              {
                title: 'Supportive Community',
                description: 'A network that stretches and challenges you.',
              },
              {
                title: 'Purpose Awareness',
                description: 'A deeper understanding of why you sing.',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-xl p-6 border border-[hsl(43,70%,55%)]/10 hover:border-[hsl(43,70%,55%)]/30 transition-all duration-500 ${
                  isVisible('gain') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-full bg-[hsl(43,70%,55%)]/10 flex items-center justify-center mb-4">
                  <span className="text-[hsl(43,70%,55%)] font-medium">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-medium text-cream mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isVisible('gain') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-gradient-to-r from-[hsl(43,70%,55%)]/10 via-[hsl(43,70%,55%)]/20 to-[hsl(43,70%,55%)]/10 rounded-2xl p-8 md:p-12">
              <p className="text-xl md:text-2xl text-cream font-light italic mb-4">
                You become part of something intentional.
              </p>
              <p className="text-muted-foreground">
                Not loud. Not shallow. Not temporary.
                <br />
                <span className="text-[hsl(43,70%,55%)] font-medium">But formative.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Join Section */}
      <section id="join" className="section-padding bg-gradient-section relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(43,70%,55%)]/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto container-padding relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible('join') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[hsl(43,70%,55%)] text-sm font-medium tracking-widest uppercase mb-4">
              The Invitation
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-cream mb-6">
              If You Know You Are Called to More
            </h2>
            <div className="divider-gold mx-auto mb-8" />

            <div className="space-y-4 text-lg text-muted-foreground mb-12">
              <p>If you feel that your voice carries more than melody…</p>
              <p>If you sense that your growth requires structure…</p>
              <p>If you desire depth over attention…</p>
            </div>

            <div className="bg-gradient-to-br from-[hsl(260,25%,15%)] to-[hsl(260,25%,10%)] rounded-2xl p-8 md:p-12 border border-[hsl(43,70%,55%)]/20 mb-12">
              <p className="text-xl text-cream/90 mb-6">
                Then this is for you.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Vox Pulchra is not for everyone. It is for the vocalist who is ready to grow — 
                patiently, intentionally, and wholeheartedly.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a
                  href="https://wa.me/07045926683"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-[hsl(43,70%,55%)] text-[hsl(260,30%,8%)] hover:bg-[hsl(43,70%,65%)] font-medium px-8"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Join via WhatsApp
                  </Button>
                </a>
                <a
                  href="https://instagram.com/vox_pulchra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[hsl(43,70%,55%)]/40 text-[hsl(43,70%,55%)] hover:bg-[hsl(43,70%,55%)]/10"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Follow on Instagram
                  </Button>
                </a>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href="tel:07045926683" className="flex items-center gap-2 hover:text-[hsl(43,70%,55%)] transition-colors">
                  <Phone className="w-4 h-4" />
                  07045926683
                </a>
                <span className="text-[hsl(43,70%,55%)]/40">|</span>
                <a
                  href="https://instagram.com/vox_pulchra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[hsl(43,70%,55%)] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @vox_pulchra
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-cream/80 italic text-lg">
                This is the beginning of a movement.
              </p>
              <p className="text-muted-foreground">
                Not of noise, but of refinement.
                <br />
                Not of hype, but of substance.
              </p>
              <p className="text-2xl md:text-3xl font-light text-cream mt-8">
                Your voice is <span className="text-[hsl(43,70%,55%)]">beautiful</span>.
                <br />
                Now it is time to <span className="text-[hsl(43,70%,55%)]">build it</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[hsl(260,35%,6%)] border-t border-[hsl(43,70%,55%)]/10">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/F74FF260-CC68-44BE-8293-40C936E1249C.jpg"
                alt="Vox Pulchra"
                className="h-12 w-auto"
              />
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/vox_pulchra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/07045926683"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[hsl(43,70%,55%)] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Vox Pulchra. Beautiful Voice.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-[hsl(43,70%,55%)]/10 text-center">
            <p className="text-cream/60 italic font-light text-lg">
              "Join Vox Pulchra. Become the voice you were meant to steward."
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
