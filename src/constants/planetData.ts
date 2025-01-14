import earthTextureUrl from '@assets/textures/earth/8k_earth_daymap.jpg';

// src/constants/planetData.ts
export interface PlanetData {
  name: string;
  distanceFromSun: number; // in AU (astronomical units)
  orbitalSpeed: number; // in km/s
  radius: number; // in km
  texture: string; // path to the texture
  hasRings?: boolean; // whether the planet has rings
  description?: string; // optional description for tooltips or help
}

export const planetData: PlanetData[] = [
  // {
  //   name: 'Mercury',
  //   distanceFromSun: 0.39,
  //   orbitalSpeed: 47.87,
  //   radius: 2440,
  //   texture: '/textures/mercury.jpg',
  // },
  // {
  //   name: 'Venus',
  //   distanceFromSun: 0.72,
  //   orbitalSpeed: 35.02,
  //   radius: 6052,
  //   texture: '/textures/venus.jpg',
  // },
  {
    name: 'Earth',
    distanceFromSun: 1.0,
    orbitalSpeed: 29.78,
    radius: 6371,
    texture: earthTextureUrl,
  },
  // {
  //   name: 'Mars',
  //   distanceFromSun: 1.52,
  //   orbitalSpeed: 24.077,
  //   radius: 3390,
  //   texture: '/textures/mars.jpg',
  // },
  // {
  //   name: 'Jupiter',
  //   distanceFromSun: 5.2,
  //   orbitalSpeed: 13.07,
  //   radius: 69911,
  //   texture: '/textures/jupiter.jpg',
  //   hasRings: false,
  // },
  // {
  //   name: 'Saturn',
  //   distanceFromSun: 9.58,
  //   orbitalSpeed: 9.69,
  //   radius: 58232,
  //   texture: '/textures/saturn.jpg',
  //   hasRings: true,
  // },
  // {
  //   name: 'Uranus',
  //   distanceFromSun: 19.22,
  //   orbitalSpeed: 6.81,
  //   radius: 25362,
  //   texture: '/textures/uranus.jpg',
  //   hasRings: true,
  // },
  // {
  //   name: 'Neptune',
  //   distanceFromSun: 30.05,
  //   orbitalSpeed: 5.43,
  //   radius: 24622,
  //   texture: '/textures/neptune.jpg',
  //   hasRings: false,
  // },
];
