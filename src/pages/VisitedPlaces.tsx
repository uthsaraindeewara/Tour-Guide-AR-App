import React from 'react';
import { Header } from '../components/Layout/Header';
import { BottomNav } from '../components/Layout/BottomNav';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, AwardIcon, StarIcon } from 'lucide-react';
import sigiriyaImg from '../assets/images/sigiriya.jpg';
import kandyTempleImg from '../assets/images/kandy_temple.jpg';
import galleFortImg from '../assets/images/galle_fort.jpg';
import adamsPeakImg from '../assets/images/adams_peak.jpg';
import { useLanguage } from '../components/LanguageContext';

export default function VisitedPlaces() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const visitedPlaces = [
    { id: '1', title: 'Sigiriya Rock Fortress', imageUrl: sigiriyaImg, date: 'June 15, 2023', notes: 'Climbed the Lion Rock and loved the view!', isFavorite: true },
    { id: '2', title: 'Temple of the Tooth (Kandy)', imageUrl: kandyTempleImg, date: 'June 12, 2023', notes: 'Beautiful sacred temple, very peaceful.', isFavorite: false },
    { id: '3', title: 'Galle Fort', imageUrl: galleFortImg, date: 'June 10, 2023', notes: 'Historic Dutch fort with amazing ocean views.', isFavorite: true },
    { id: '4', title: "Adam's Peak (Sri Pada)", imageUrl: adamsPeakImg, date: 'June 8, 2023', notes: 'Challenging climb but the sunrise view was unforgettable!', isFavorite: false }
  ];

  const achievements = [
    { name: 'Explorer', description: 'Visited 5 locations', completed: true },
    { name: 'Museum Buff', description: 'Visited 3 museums', completed: true },
    { name: 'History Fan', description: 'Visited 5 historical sites', completed: false }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title={t('Visited Places')} />
      <div className="p-4">
        {/* Stats Summary */}
        <Card className="mb-6">
          <h2 className="font-medium mb-3">{t('Your Journey Stats')}</h2>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-500">12</div>
              <div className="text-xs text-gray-400">{t('Places Visited')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">3</div>
              <div className="text-xs text-gray-400">{t('Cities')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">5</div>
              <div className="text-xs text-gray-400">{t('Favorites')}</div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">{t('Achievements')}</h2>
            <Button variant="ghost" size="sm">{t('View All')}</Button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {achievements.map((achievement, index) => (
              <Card key={index} className="min-w-[140px] flex flex-col items-center p-4">
                <div className={`w-10 h-10 rounded-full ${achievement.completed ? 'bg-blue-500' : 'bg-gray-700'} flex items-center justify-center mb-2`}>
                  <AwardIcon size={20} className="text-white" />
                </div>
                <h3 className="font-medium text-sm text-center">{t(achievement.name)}</h3>
                <p className="text-xs text-gray-400 text-center mt-1">{t(achievement.description)}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Visited Places Timeline */}
        <h2 className="text-lg font-medium mb-3">{t('Your Timeline')}</h2>
        <div className="space-y-4">
          {visitedPlaces.map(place => (
            <Card key={place.id} className="overflow-hidden">
              <div className="h-32 relative">
                <img src={place.imageUrl} alt={place.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Button variant={place.isFavorite ? 'primary' : 'secondary'} className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                    <StarIcon size={16} className={place.isFavorite ? 'text-white' : ''} fill={place.isFavorite ? 'currentColor' : 'none'} />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{t(place.title)}</h3>
                  <div className="flex items-center text-xs text-gray-400">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>{t(place.date)}</span>
                  </div>
                </div>
                {place.notes && <p className="text-gray-400 text-sm mb-3">{t(place.notes)}</p>}
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/landmark/${place.id}`)}>
                    {t('Details')}
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/ar-scanner?landmark=${place.id}`)}>
                    {t('Visit Again')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}