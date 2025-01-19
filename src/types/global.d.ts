import { ReactThreeFiber } from '@react-three/fiber';
import { ShaderMaterial } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      shaderMaterial: ReactThreeFiber.Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    }
  }
}
