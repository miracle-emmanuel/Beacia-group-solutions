// Placeholder catalogue. Swap the `image` paths for real product photography
// (drop files in /public/products/ and reference them as "/products/filename.jpg").

export const categories = [
  { slug: 'hair', label: 'Hair' },
  { slug: 'hair-product', label: 'Hair Products' },
  { slug: 'jewelry', label: 'Jewelry' },
  { slug: 'perfume', label: 'Perfume' },
]

// This is the seed catalogue used the first time the site loads in a
// browser, and the fallback used by "Reset to default catalogue" in the
// admin panel. Once the admin panel is used, the live catalogue lives in
// localStorage (see src/context/ProductsContext.jsx) — editing this file
// only changes what NEW visitors start out with, not what admins have
// already added/removed in their browser.
export const defaultProducts = [
  {
    id: 'hair-01',
    name: '30" Raw Cambodian Bundle',
    category: 'hair',
    price: 145,
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800&auto=format&fit=crop',
    description: 'Double-drawn raw hair bundle, silky texture, minimal shedding, up to 2 years wear with proper care.',
    isNew: true,
  },
  {
    id: 'hair-02',
    name: 'HD Lace Closure Wig',
    category: 'hair',
    price: 210,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    description: 'Pre-plucked HD lace closure wig with natural hairline, glueless and beginner friendly.',
    isNew: true,
  },
  {
    id: 'hair-03',
    name: 'Deep Wave Frontal Wig',
    category: 'hair',
    price: 260,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop',
    description: '13x4 transparent lace frontal, deep wave pattern, bleached knots for a natural scalp look.',
    isNew: false,
  },
  {
    id: 'hair-04',
    name: 'Bone Straight Bundles (3pc)',
    category: 'hair',
    price: 190,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop',
    description: 'Silky bone straight bundle set, tangle-free, colours and blends beautifully.',
    isNew: false,
  },
  {
    id: 'hair-product-01',
    name: 'Argan Oil Hair Serum',
    category: 'hair-product',
    price: 16,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    description: 'Lightweight argan oil serum that smooths frizz and adds shine without residue.',
    isNew: true,
  },
  {
    id: 'hair-product-02',
    name: 'Edge Control Gel',
    category: 'hair-product',
    price: 9,
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?q=80&w=800&auto=format&fit=crop',
    description: 'Strong-hold, non-flaking edge control for sleek edges that last all day.',
    isNew: false,
  },
  {
    id: 'hair-product-03',
    name: 'Moisture Repair Shampoo & Conditioner Set',
    category: 'hair-product',
    price: 22,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    description: 'Sulfate-free duo that cleanses and deep-conditions bundles, wigs and natural hair alike.',
    isNew: true,
  },
  {
    id: 'hair-product-04',
    name: 'Satin Bonnet & Pillowcase Set',
    category: 'hair-product',
    price: 14,
    image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?q=80&w=800&auto=format&fit=crop',
    description: 'Protects installs and natural hair overnight, reduces frizz and breakage.',
    isNew: false,
  },
  {
    id: 'jewelry-01',
    name: '18K Gold-Plated Layered Necklace',
    category: 'jewelry',
    price: 38,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Tarnish-resistant layered chain necklace, waterproof plating, everyday luxury.',
    isNew: true,
  },
  {
    id: 'jewelry-02',
    name: 'Pearl Drop Earrings',
    category: 'jewelry',
    price: 24,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    description: 'Freshwater pearl drops on gold-plated hooks, lightweight for all-day wear.',
    isNew: false,
  },
  {
    id: 'jewelry-03',
    name: 'Cuban Link Bracelet',
    category: 'jewelry',
    price: 45,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800&auto=format&fit=crop',
    description: 'Bold Cuban link bracelet in gold-tone stainless steel, hypoallergenic.',
    isNew: true,
  },
  {
    id: 'jewelry-04',
    name: 'Stackable Signet Ring Set',
    category: 'jewelry',
    price: 29,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    description: 'Set of three stackable rings, mixed textures, adjustable band.',
    isNew: false,
  },
  {
    id: 'perfume-01',
    name: 'Amber Oud Eau de Parfum',
    category: 'perfume',
    price: 55,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
    description: 'Rich amber and oud blend with a warm vanilla base, 100ml, long-lasting sillage.',
    isNew: true,
  },
  {
    id: 'perfume-02',
    name: 'Rose Noire Parfum',
    category: 'perfume',
    price: 48,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    description: 'Deep rose petals layered over dark musk, 50ml, evening signature scent.',
    isNew: false,
  },
  {
    id: 'perfume-03',
    name: 'Citrus Bloom Eau de Toilette',
    category: 'perfume',
    price: 39,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    description: 'Fresh citrus and white tea notes, 100ml, ideal for daytime wear.',
    isNew: true,
  },
  {
    id: 'perfume-04',
    name: 'Golden Vanilla Musk',
    category: 'perfume',
    price: 42,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop',
    description: 'Creamy vanilla with a soft musk dry-down, 75ml, unisex signature.',
    isNew: false,
  },
]

export const testimonials = [
  {
    name: 'Adaeze O.',
    location: 'London',
    quote:
      'The raw hair bundles from Beacia are unmatched — no shedding, no tangling, and it still looks brand new after months.',
  },
  {
    name: 'Michelle T.',
    location: 'Manchester',
    quote:
      'Ordered a lace frontal wig and the necklace to match. Everything arrived beautifully packaged and the WhatsApp checkout made it so easy.',
  },
  {
    name: 'Ruth A.',
    location: 'Birmingham',
    quote:
      'Beacia is my go-to for perfumes now. The Amber Oud lasts all day and I always get compliments.',
  },
  {
    name: 'Grace N.',
    location: 'Leeds',
    quote:
      'Fast replies, genuine products, and the jewellery pieces still look new months later. Highly recommend this team.',
  },
]
