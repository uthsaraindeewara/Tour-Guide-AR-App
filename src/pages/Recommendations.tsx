// src/pages/Recommendations.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Layout/Header";
import { BottomNav } from "../components/Layout/BottomNav";
import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";
import { MapPinIcon, StarIcon } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";

import sigiriyaImg from "../assets/images/sigiriya.jpg";
import kandyTempleImg from "../assets/images/kandy_temple.jpg";
import galleFortImg from "../assets/images/galle_fort.jpg";
import adamsPeakImg from "../assets/images/adams_peak.jpg";

export default function Recommendations() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Separate Nearby and Popular recommendations
  const nearbyPlaces = [
    {
      id: "1",
      title: "Sigiriya Rock Fortress",
      description: "Climbed the Lion Rock and loved the view!",
      imageUrl: sigiriyaImg,
      distance: "2.5 km",
      rating: 5,
      category: "Historic",
    },
    {
      id: "2",
      title: "Temple of the Tooth (Kandy)",
      description: "Beautiful sacred temple, very peaceful.",
      imageUrl: kandyTempleImg,
      distance: "1.2 km",
      rating: 5,
      category: "Religious",
    },
  ];

  const popularPlaces = [
    {
      id: "3",
      title: "Galle Fort",
      description: "Historic Dutch fort with amazing ocean views.",
      imageUrl: galleFortImg,
      distance: "5.8 km",
      rating: 4.5,
      category: "Historic",
    },
    {
      id: "4",
      title: "Adam's Peak (Sri Pada)",
      description: "Challenging climb but the sunrise view was unforgettable!",
      imageUrl: adamsPeakImg,
      distance: "12.0 km",
      rating: 5,
      category: "Nature",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header title={t("Recommendations")} />
      <div className="p-4">
        {/* Nearby Recommendations */}
        <h2 className="text-lg font-medium mb-3">{t("Nearby Recommendations")}</h2>
        <div className="space-y-4 mb-6">
          {nearbyPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden cursor-pointer">
              <div
                className="h-32 relative"
                onClick={() => navigate(`/landmark/${place.id}`)}
              >
                <img
                  src={place.imageUrl}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    {t(place.category)}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{t(place.title)}</h3>
                  <div className="flex items-center text-xs text-gray-400">
                    <MapPinIcon size={12} className="mr-1" />
                    <span>{place.distance}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{t(place.description)}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-yellow-400">
                    <StarIcon size={16} fill="currentColor" />
                    <span className="ml-1 text-sm text-gray-300">{place.rating}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/landmark/${place.id}`)}
                    >
                      {t("Details")}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/ar-scanner?landmark=${place.id}`)}
                    >
                      {t("Start Tour")}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Popular Recommendations */}
        <h2 className="text-lg font-medium mb-3">{t("Popular Places")}</h2>
        <div className="space-y-4">
          {popularPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden cursor-pointer">
              <div
                className="h-32 relative"
                onClick={() => navigate(`/landmark/${place.id}`)}
              >
                <img
                  src={place.imageUrl}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                    {t(place.category)}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{t(place.title)}</h3>
                <p className="text-gray-400 text-sm mb-3">{t(place.description)}</p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/landmark/${place.id}`)}
                  >
                    {t("Details")}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/ar-scanner?landmark=${place.id}`)}
                  >
                    {t("Start Tour")}
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