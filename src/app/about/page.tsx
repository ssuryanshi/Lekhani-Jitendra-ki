import LotusIcon from '@/components/ui/LotusIcon';
import AboutPhoto from '@/components/ui/AboutPhoto';
import { Facebook, Linkedin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'परिचय — लेखनी जितेंद्र की',
  description: 'Dr. Jitendra Kumar के बारे में — मेरठ, उत्तर प्रदेश के एक सरकारी अधिकारी और साहित्य प्रेमी।',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-16">
        <LotusIcon className="w-10 h-10 text-gold-600/50 mb-5" />
        <h1 className="font-display text-4xl sm:text-5xl text-ivory-100 text-center mb-2">
          परिचय
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold-500/50">
          About
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Photo side */}
        <div className="lg:col-span-2 flex flex-col items-center gap-6">
          {/* Photo placeholder — replace src with actual photo */}
          <div className="relative w-56 h-56 sm:w-72 sm:h-72">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-600/30 via-forest-600/20 to-rose-dusty/20 animate-pulse" />
            <AboutPhoto />
            {/* Lotus ring */}
            <div className="absolute -inset-3 rounded-full border border-gold-500/15" />
          </div>

          <div className="text-center">
            <h2 className="font-hindi text-2xl text-ivory-100 mb-1">डॉ. जितेंद्र कुमार</h2>
            <p className="font-serif text-gold-400/60 text-sm italic">Dr. Jitendra Kumar</p>
            <p className="font-hindi text-ivory-200/40 text-sm mt-2">मेरठ, उत्तर प्रदेश</p>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-ivory-200/50 hover:text-gold-300 border-gold-700/20 hover:border-gold-500/40 transition-all duration-200 font-serif text-sm"
            >
              <Facebook size={15} />
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-ivory-200/50 hover:text-gold-300 border-gold-700/20 hover:border-gold-500/40 transition-all duration-200 font-serif text-sm"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bio side */}
        <div className="lg:col-span-3 space-y-8">
          {/* Hindi bio */}
          <div className="glass-card rounded-2xl p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent rounded-t-2xl" />
            <h3 className="font-hindi text-xl text-gold-300 mb-5">
              जीवन परिचय
            </h3>
            <div className="font-hindi text-ivory-200/70 text-base leading-[1.95] space-y-4">
              <p>
                डॉ. जितेंद्र कुमार मेरठ, उत्तर प्रदेश के एक सम्मानित सरकारी अधिकारी हैं जिनका हृदय सदैव साहित्य की ओर उन्मुख रहा है। अपने छात्र जीवन में वे काव्य-सृजन के प्रति विशेष रूचि रखते थे, परंतु कार्य की व्यस्तताओं के कारण यह यात्रा अधूरी रह गई।
              </p>
              <p>
                कोविड-19 महामारी के कठिन समय ने उन्हें अपनी सोई हुई रचनात्मकता को पुनः जागृत करने का अवसर दिया। तब से वे निरंतर लिखते आ रहे हैं और प्रतिसप्ताह अपनी भावनाओं को शब्दों में ढालकर पाठकों तक पहुँचाते हैं।
              </p>
              <p>
                एक सरल, विनम्र और जमीन से जुड़े इंसान, जिनका एकमात्र उद्देश्य है — दूसरों के जीवन को बेहतर बनाना। उनकी कविताएँ प्रेम, प्रकृति, समाज और आत्म-चिंतन के विभिन्न रंगों को समेटे हुए हैं।
              </p>
            </div>
          </div>

          {/* English bio */}
          <div className="glass-card rounded-2xl p-8 relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent rounded-t-2xl" />
            <h3 className="font-display text-lg text-gold-300/80 mb-5">
              About
            </h3>
            <div className="font-serif text-ivory-200/60 text-base leading-relaxed space-y-3">
              <p>
                Dr. Jitendra Kumar is a government officer from Meerut, Uttar Pradesh — a man of deep warmth, discipline, and social purpose. His passion for Hindi literature, which first bloomed during his college years, found its way back to him during the COVID-19 pandemic.
              </p>
              <p>
                Since then, he has written prolifically, sharing poems and prose that touch on the full spectrum of human experience — from nature&apos;s beauty to social reflection, from quiet love to spiritual contemplation.
              </p>
              <p>
                Grounded, kind-hearted, and deeply respected within his community, Dr. Kumar writes not for acclaim, but because words are the truest form of his self.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { hindi: 'कविताएँ', en: 'Poems', value: '200+' },
              { hindi: 'वर्ष', en: 'Years Active', value: '5+' },
              { hindi: 'मेरठ से', en: 'From Meerut, UP', value: '🇮🇳' },
            ].map((stat) => (
              <div key={stat.en} className="glass-card rounded-xl p-5 text-center">
                <div className="font-display text-2xl text-gold-300 mb-1">{stat.value}</div>
                <div className="font-hindi text-xs text-ivory-200/50">{stat.hindi}</div>
                <div className="font-serif text-[10px] text-ivory-200/30 uppercase tracking-widest">{stat.en}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
