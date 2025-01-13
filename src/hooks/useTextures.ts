import { useLoader } from '@react-three/fiber';
import { TextureLoader, Texture } from 'three';

/**
 * Custom hook to load multiple textures.
 * @param textureUrls - Array of texture URLs to load.
 * @returns Array of loaded textures.
 */
const useTextures = (textureUrls: string[]): Texture[] => {
  const textures = useLoader(TextureLoader, textureUrls);

  // Ensure the return type is correctly inferred as Texture[]
  return textures as Texture[];
};

export default useTextures;
