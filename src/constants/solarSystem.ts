// src/constants/solarSystem.ts
export interface SolarSystemConfig {
  showOrbits: boolean;
  showStarfield: boolean;
  starfieldTexture: string; // path to starfield texture
  sun: {
    radius: number; // in km
    texture: string; // path to the Sun texture
    lightIntensity: number; // light emitted from the Sun
  };
}

export const solarSystemConfig: SolarSystemConfig = {
  showOrbits: true,
  showStarfield: true,
  starfieldTexture: '/textures/starfield.jpg',
  sun: {
    radius: 696340,
    texture: '/textures/sun.jpg',
    lightIntensity: 1.5,
  },
};
