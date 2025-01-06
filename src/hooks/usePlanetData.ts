import { planetData, PlanetData } from '../constants/planetData';

const usePlanetData = () => {
  // Get all planets
  const getPlanets = (): PlanetData[] => planetData;

  // Get a specific planet by name
  const getPlanetByName = (name: string): PlanetData | undefined => {
    return planetData.find((planet) => planet.name.toLowerCase() === name.toLowerCase());
  };

  return { getPlanets, getPlanetByName };
};

export default usePlanetData;
