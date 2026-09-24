import { useEffect, useState } from 'react';
import { store } from './config/store.config';
import { emotions } from './config/emotions.config';
import { fire } from './lib/burst';
import MoodBackground from './components/orientador/MoodBackground';
import EmotionalWizard from './components/orientador/EmotionalWizard';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductGrid from './components/catalog/ProductGrid';
import ZeroDoubtModal from './components/checkout/ZeroDoubtModal';
import WhatsappFab from './components/ui/WhatsappFab';
import RotatingSeal from './components/ui/RotatingSeal';
import BurstLayer from './components/ui/BurstLayer';
import TrustStrip from './components/sections/TrustStrip';
import HowItWorks from './components/sections/HowItWorks';

export default function App() {
  const [emotionId, setEmotionId] = useState('casual');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const e = emotions[emotionId];
  const f = store.features;

  // Cambia de intención y lanza el efecto de esa intención
  const pickEmotion = (id, origin) => {
    if (id === emotionId) return;
    setEmotionId(id);
    fire(id, origin);
  };

  useEffect(() => {
    const font = store.fonts[store.fontStyle];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = font.url;
    document.head.appendChild(link);
    const root = document.documentElement.style;
    root.setProperty('--font-display', font.display);
    root.setProperty('--font-body', font.body);
    document.title = `${store.name} · ${store.tagline}`;
    return () => link.remove();
  }, []);

  return (
    <MoodBackground emotionId={emotionId}>
      <Header emotionId={emotionId} onSelect={pickEmotion} onWizard={() => setWizardOpen(true)} />
      <main>
        <section className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 md:pt-24">
          {f.seal && (
            <div className="absolute right-5 top-10 hidden md:block lg:right-10 lg:top-16">
              <RotatingSeal />
            </div>
          )}
          <h1 className="max-w-[16ch] font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">{e.headline}</h1>
          <p className="mt-6 max-w-[48ch] text-lg text-muted">{e.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {f.wizard && (
              <button onClick={() => setWizardOpen(true)} className="press rounded-full bg-accent px-6 py-3 font-medium text-white">No sé cuál elegir</button>
            )}
            <a href="#catalogo" className="press rounded-full border border-line px-6 py-3 font-medium hover:bg-card">Ver los arreglos</a>
          </div>
        </section>

        {f.trustStrip && <TrustStrip />}
        <ProductGrid emotionId={emotionId} onSelect={setProduct} />
        {f.howItWorks && <HowItWorks />}
      </main>
      <Footer />

      {f.fab && !wizardOpen && !product && <WhatsappFab />}

      {wizardOpen && (
        <EmotionalWizard
          onClose={() => setWizardOpen(false)}
          onEmotion={pickEmotion}
          onPick={(p) => { setWizardOpen(false); setProduct(p); }}
        />
      )}
      {product && <ZeroDoubtModal product={product} emotionId={emotionId} onClose={() => setProduct(null)} />}

      <BurstLayer />
    </MoodBackground>
  );
}