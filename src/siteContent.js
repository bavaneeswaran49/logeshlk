export const business = { name: 'Sri Builders and Developers', phone: '+91 99522 72769', telephone: '+919952272769', whatsapp: '919952272769', location: 'Tiruppur, Tamil Nadu' }

export function whatsappUrl(message = 'Hello Sri Builders, I would like to discuss a construction project in Tiruppur.') {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}

export const villas = [
  {
    id: 'contemporary', style: 'Contemporary', title: 'Contemporary', subtitle: 'Clean lines. Open possibilities.',
    image: '/images/villa-hero.jpg', alt: 'Contemporary family home concept with limestone, timber and tropical landscaping',
    description: 'An expressive home with generous openings, warm natural materials and a seamless connection to the outdoors.',
    features: ['Open living spaces', 'Natural stone & timber', 'Indoor–outdoor connection'],
    vision: 'A direction for those who enjoy open spaces, understated design and an effortless everyday rhythm.',
  },
  {
    id: 'courtyard', style: 'Courtyard', title: 'Courtyard living', subtitle: 'Nature, at the heart of home.',
    image: '/images/villa-courtyard.jpg', alt: 'Courtyard home concept with a private garden, traditional stone columns and timber details',
    description: 'A quiet retreat organised around a private garden. Shared moments, shaded corners and room to unwind.',
    features: ['Private garden courtyard', 'Thoughtful family spaces', 'Shaded outdoor living'],
    vision: 'A direction for those who want nature at the heart of the home and a sense of calm in every room.',
  },
  {
    id: 'classic', style: 'Classic', title: 'Timeless elegance', subtitle: 'Warmth in every proportion.',
    image: '/images/villa-interior.jpg', alt: 'Home interior concept with natural stone, warm wood, soft furnishings and garden views',
    description: 'A refined approach to timeless living. Beautiful proportions and a warm material palette create an enduring character.',
    features: ['Elegant living & dining', 'Warm, layered interiors', 'Personalised finishes'],
    vision: 'A direction for those drawn to graceful spaces, tactile finishes and a welcoming home.',
  },
]
