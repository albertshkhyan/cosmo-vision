import * as THREE from 'three';

/**
 * Utility function to create a uniform object for shaders.
 * @param uniforms - An object containing uniform values.
 * @returns A formatted uniform object for use in Three.js shaders.
 */
export function createUniforms(uniforms: Record<string, any>): Record<string, THREE.IUniform> {
  const formattedUniforms: Record<string, THREE.IUniform> = {};
  for (const key in uniforms) {
    formattedUniforms[key] = { value: uniforms[key] };
  }
  return formattedUniforms;
}

/**
 * Utility function to load shader files (both vertex and fragment).
 * This assumes shaders are stored in `src/shaders/<name>/<type>.glsl`.
 * @param name - The name of the shader folder.
 * @returns An object containing the vertex and fragment shader strings.
 */
export async function loadShaderFiles(name: string): Promise<{ vertex: string; fragment: string }> {
  const vertexPath = `/src/shaders/${name}/${name}Vertex.glsl`;
  const fragmentPath = `/src/shaders/${name}/${name}Fragment.glsl`;

  const [vertexShader, fragmentShader] = await Promise.all([
    fetch(vertexPath).then((res) => res.text()),
    fetch(fragmentPath).then((res) => res.text()),
  ]);

  return {
    vertex: vertexShader,
    fragment: fragmentShader,
  };
}

/**
 * Utility to add time uniform and animate it for flickering stars.
 * @param material - The ShaderMaterial to animate.
 * @param clock - A THREE.Clock instance.
 */
export function addTimeUniform(material: THREE.ShaderMaterial, clock: THREE.Clock): void {
  if (!material.uniforms.time) {
    material.uniforms.time = { value: 0 };
  }

  const update = () => {
    material.uniforms.time.value = clock.getElapsedTime();
    requestAnimationFrame(update);
  };

  update();
}

/**
 * Utility function to create a ShaderMaterial.
 * @param vertexShader - The vertex shader code as a string.
 * @param fragmentShader - The fragment shader code as a string.
 * @param uniforms - Optional uniforms to pass to the shader.
 * @returns A Three.js ShaderMaterial instance.
 */
export function createShaderMaterial(
  vertexShader: string,
  fragmentShader: string,
  uniforms: Record<string, any> = {}
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: createUniforms(uniforms),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/**
 * Utility function to generate random starfield uniforms for flickering effects.
 * @param count - Number of stars.
 * @returns A `Float32Array` of random values for each star.
 */
export function generateFlickerValues(count: number): Float32Array {
  const flickerValues = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    flickerValues[i] = Math.random(); // Random intensity for each star
  }
  return flickerValues;
}
