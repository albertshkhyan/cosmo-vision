import React from 'react';

import Canvas3D from '@components/core-3d/Canvas3D';
import Sun from '@threeD/Sun';
import { HaloState } from '@ui/configs/HaloControls.tsx';
import { ProminenceState } from '@ui/configs/ProminenceControls.tsx';
import { SunState } from '@ui/configs/SunControls.tsx';

// If you have additional 3D components like Earth, Mars, or Starfield, you can import them here
// import Earth from '@threeD/Earth';
// import Mars from '@threeD/Mars';
// import Starfield from '@threeD/Starfield';

interface SolarSystemSceneProps {
  sunValues: SunState;
  haloValues: HaloState; // Include halo configuration in props
  prominenceValues: ProminenceState; // Include prominence configuration in props
  // showOrbits?: boolean;
  // showStarfield?: boolean;
  focusPlanet?: string; // Optional prop for focusing on a specific planet
}

const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
  sunValues,
  haloValues,
  prominenceValues,
  // showOrbits = true,
  // showStarfield = true,
  focusPlanet,
}) => {
  // Function to adjust camera position based on the focused planet
  const adjustCamera = (planetName: string): [number, number, number] => {
    switch (planetName) {
      case 'Sun':
        return [0, 10, 20]; // Example position for the Sun
      case 'Earth':
        return [10, 5, 15]; // Example position for Earth
      case 'Mars':
        return [15, 7, 20]; // Example position for Mars
      default:
        return [0, 10, 20]; // Default position
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas3D initialCameraPosition={adjustCamera(focusPlanet || 'Sun')} showControls={true}>
        {/* The Sun */}
        <Sun haloValues={haloValues} sunValues={sunValues} prominenceValues={prominenceValues} />

        {/* Planets */}
        {/* Uncomment and add planets as needed */}
        {/* <Earth distanceFromSun={8} orbitalSpeed={0.01} showOrbit={showOrbits} /> */}
        {/* <Mars distanceFromSun={12} orbitalSpeed={0.008} showOrbit={showOrbits} /> */}

        {/* Starfield */}
        {/* {showStarfield && <Starfield />} */}
      </Canvas3D>
    </div>
  );
};

export default SolarSystemScene;
