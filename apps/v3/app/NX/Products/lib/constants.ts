import { PRODUCT_IMAGES } from './productImages';
import type { RoutinePeriod, RoutineProduct, RoutineStage } from '../../../types';

export const ROUTINE_PRODUCTS: RoutineProduct[] = [
  {
    id: 'cleanser',
    name: 'Cicaplast B5 Anti-Bacterial Cleansing Gel Wash',
    shortName: 'Cicaplast',
    imageSrc: PRODUCT_IMAGES.cleanser,
    brand: 'La Roche-Posay',
    category: 'Cleanse',
    price: '£16.50',
    size: '200ml',
    whyInRoutine:
      "A gentle, non-stripping cleanser that respects your barrier. We're keeping it because your skin has been calm and comfortable on it - no reason to change what's working.",
    howToUse:
      'Morning and evening. Massage a small amount onto damp skin, then rinse with lukewarm water. No scrubbing needed.',
    note:
      "If your skin feels tight afterwards, you're either using too much or the water's a touch too hot.",
  },
  {
    id: 'vitC',
    name: 'Vitamin C Tetra Serum',
    shortName: 'C-Tetra Vit C',
    imageSrc: PRODUCT_IMAGES.vitC,
    brand: 'Medik8',
    category: 'Treat - Vitamin C',
    price: '£35.00',
    size: '30ml',
    tag: 'New',
    whyInRoutine:
      "New this review. A gentle, oil-based vitamin C that brightens, evens tone, and boosts your SPF through the day. I've started you on a lower strength so we ease in slowly.",
    howToUse:
      'Mornings, after cleansing and before moisturiser. Every other day for the first two weeks, then daily once you know it suits you. A few drops is plenty.',
    note:
      'A light tingle at first is normal. If you get redness or stinging that lingers, drop back to twice a week and message me.',
  },
  {
    id: 'moisturiser',
    name: 'Total Moisture Daily Facial Cream',
    shortName: 'Total Moisture',
    imageSrc: PRODUCT_IMAGES.moisturiser,
    brand: 'Medik8',
    category: 'Moisturise',
    price: '£48.00',
    size: '50ml',
    whyInRoutine:
      'Your daily cream - it seals everything in and keeps the barrier comfortable. The one steady constant in your routine.',
    howToUse:
      'Morning and evening, as your last skincare step before SPF in the day. A pea-sized amount, pressed in gently.',
    note:
      'In colder months you can layer a little extra at night if your skin feels tight.',
  },
  {
    id: 'spf',
    name: 'Relief Sun Rice + Probiotics SPF50+',
    shortName: 'Relief Sun SPF',
    imageSrc: PRODUCT_IMAGES.spf,
    brand: 'Beauty of Joseon',
    category: 'Protect',
    price: '£18.00',
    size: '50ml',
    whyInRoutine:
      "The most important step in the whole routine. It protects everything we're working on and stops the pigmentation we've been treating from creeping back.",
    howToUse:
      'Every morning, last step, rain or shine. Two finger-lengths for face and neck. Reapply if you are out in strong sun.',
    note:
      "This one is light and leaves no white cast - that's exactly why I chose it for you.",
  },
  {
    id: 'peptide',
    name: 'The 6 Peptide Skin Booster Serum',
    shortName: '6 Peptide',
    imageSrc: PRODUCT_IMAGES.peptide,
    brand: 'COSRX',
    category: 'Treat - Peptides',
    price: '£27.00',
    size: '150ml',
    tag: 'Moved to PM',
    whyInRoutine:
      "Moved to evenings this review so it is not competing with your new vitamin C in the morning. Peptides support firmness and help your barrier recover overnight.",
    howToUse:
      'Evenings, after cleansing and before moisturiser. A few drops, pressed in. Same product as before - just a better slot for it.',
    note:
      'Give it a few weeks. Peptides are a slow, steady kind of ingredient rather than a quick fix.',
  },
];

export const AM_PRODUCT_IDS: string[] = ['cleanser', 'vitC', 'moisturiser', 'spf'];

export const PM_PRODUCT_IDS: string[] = ['cleanser', 'peptide', 'moisturiser'];

export const PRODUCTS_BY_ID: Record<string, RoutineProduct> = ROUTINE_PRODUCTS.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, RoutineProduct>,
);

export const PERIOD_PRODUCT_IDS: Record<RoutinePeriod, string[]> = {
  am: AM_PRODUCT_IDS,
  pm: PM_PRODUCT_IDS,
};

export const ROUTINE_STAGES: RoutineStage[] = [
  { stage: 'Cleanse', am: 'cleanser', pm: 'cleanser' },
  { stage: 'Treat', am: 'vitC', pm: 'peptide' },
  { stage: 'Moisturise', am: 'moisturiser', pm: 'moisturiser' },
  { stage: 'Protect', am: 'spf', pm: null },
];

export function getProductsForPeriod(period: RoutinePeriod): RoutineProduct[] {
  return PERIOD_PRODUCT_IDS[period].map((id) => PRODUCTS_BY_ID[id]).filter(Boolean);
}