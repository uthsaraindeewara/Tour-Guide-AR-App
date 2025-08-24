import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Button } from '../components/UI/Button';
import { Tabs } from '../components/UI/Tabs';
import { Badge } from '../components/UI/Badge';
import { ClockIcon, MapPinIcon, StarIcon, ShareIcon, InfoIcon, DollarSignIcon, GlobeIcon } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

// Mock images
import sigiriyaImg from '../assets/images/sigiriya.jpg';
import kandyTempleImg from '../assets/images/kandy_temple.jpg';
import galleFortImg from '../assets/images/galle_fort.jpg';
import adamsPeakImg from '../assets/images/adams_peak.jpg';

export default function LandmarkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Landmark data
  const landmarks = [
    {
      id: '1',
      title: t('Sigiriya Rock Fortress'),
      description: t('Climbed the Lion Rock and loved the view!'),
      imageUrl: sigiriyaImg,
      category: t('Historic'),
      rating: 5,
      reviews: 1023,
      location: t('Sigiriya, Sri Lanka'),
      openingHours: t('6:00 AM - 5:30 PM'),
      ticketPrice: '$30',
      website: 'www.sigiriya.lk',
      history: t('Sigiriya is an ancient rock fortress and palace ruin, built in the 5th century by King Kashyapa. It is renowned for its frescoes and extensive gardens.'),
      funFacts: [
        t('UNESCO World Heritage site'),
        t('Also known as Lion Rock'),
        t('Famous for its ancient frescoes'),
        t('The gardens are some of the oldest landscaped gardens in the world')
      ]
    },
    {
      id: '2',
      title: t('Temple of the Tooth (Kandy)'),
      description: t('Beautiful sacred temple, very peaceful.'),
      imageUrl: kandyTempleImg,
      category: t('Religious'),
      rating: 5,
      reviews: 980,
      location: t('Kandy, Sri Lanka'),
      openingHours: t('5:30 AM - 8:00 PM'),
      ticketPrice: '$10',
      website: 'www.sridaladadewalaya.lk',
      history: t('The Temple of the Tooth houses the sacred tooth relic of the Buddha and is an important pilgrimage site for Buddhists.'),
      funFacts: [
        t('Houses the sacred tooth relic of Buddha'),
        t('Major site for cultural and religious festivals'),
        t('Built in the 4th century AD'),
        t('Located within the royal palace complex of Kandy')
      ]
    },
    {
      id: '3',
      title: t('Galle Fort'),
      description: t('Historic Dutch fort with amazing ocean views.'),
      imageUrl: galleFortImg,
      category: t('Historic'),
      rating: 4.5,
      reviews: 874,
      location: t('Galle, Sri Lanka'),
      openingHours: t('8:00 AM - 6:00 PM'),
      ticketPrice: t('Free'),
      website: 'www.gallefort.lk',
      history: t('Galle Fort is a fortified old city founded by Portuguese colonists in the 16th century, later extensively fortified by the Dutch.'),
      funFacts: [
        t('UNESCO World Heritage site'),
        t('Contains colonial architecture'),
        t('Popular for sunset views'),
        t('Dutch built most of the current fortifications')
      ]
    },
    {
      id: '4',
      title: t("Adam's Peak (Sri Pada)"),
      description: t('Challenging climb but the sunrise view was unforgettable!'),
      imageUrl: adamsPeakImg,
      category: t('Nature'),
      rating: 5,
      reviews: 654,
      location: t('Central Province, Sri Lanka'),
      openingHours: t('24 hours'),
      ticketPrice: t('Free'),
      website: 'www.adamspeak.lk',
      history: t("Adam's Peak is a tall conical mountain famed for its 'sacred footprint' and religious significance for multiple faiths."),
      funFacts: [
        t('Sacred footprint at the summit'),
        t('Pilgrimage site for Buddhists, Hindus, Muslims, and Christians'),
        t('Climb usually starts at night to reach sunrise'),
        t('Height: 2,243 meters')
      ]
    }
  ];

  // Get selected landmark by ID
  const landmark = landmarks.find(l => l.id === id) || landmarks[0];

  const tabContent = [
    {
      id: 'info',
      label: t('Overview'),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">{landmark.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm">
              <ClockIcon size={16} className="text-gray-400 mr-2" />
              <span>{landmark.openingHours}</span>
            </div>
            <div className="flex items-center text-sm">
              <DollarSignIcon size={16} className="text-gray-400 mr-2" />
              <span>{landmark.ticketPrice}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPinIcon size={16} className="text-gray-400 mr-2" />
              <span>{landmark.location}</span>
            </div>
            <div className="flex items-center text-sm">
              <GlobeIcon size={16} className="text-gray-400 mr-2" />
              <span>{landmark.website}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'history',
      label: t('History'),
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">{landmark.history}</p>
        </div>
      )
    },
    {
      id: 'facts',
      label: t('Fun Facts'),
      content: (
        <div>
          <ul className="space-y-3">
            {landmark.funFacts.map((fact, index) => (
              <li key={index} className="flex">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                  <InfoIcon size={14} />
                </div>
                <span className="text-gray-300">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header showBack title={landmark.title} />
      <div className="flex-1">
        {/* Hero Image */}
        <div className="relative h-64">
          <img src={landmark.imageUrl} alt={landmark.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div>
              <Badge variant="primary" className="mb-2">{landmark.category}</Badge>
              <h1 className="text-2xl font-bold text-white">{landmark.title}</h1>
            </div>
            <div className="flex items-center bg-black/60 rounded-full px-3 py-1">
              <StarIcon size={16} className="text-yellow-500 mr-1" />
              <span>{landmark.rating}</span>
              <span className="text-xs text-gray-400 ml-1">({landmark.reviews})</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Tabs tabs={tabContent} defaultTab="info" />
          <div className="mt-6 flex space-x-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate(`/ar-scanner?landmark=${id}`)}
            >
              {t('Start AR Tour')}
            </Button>
            <Button variant="outline" className="w-12 flex justify-center" onClick={() => {}}>
              <ShareIcon size={20} />
            </Button>
            <Button variant="outline" className="w-12 flex justify-center" onClick={() => {}}>
              <StarIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}