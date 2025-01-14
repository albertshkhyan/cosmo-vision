varying vec2 vUv;        // UV coordinates
varying vec3 vNormal;    // Normal vector

void main() {
    vUv = uv;                           // Pass UV coordinates to the fragment shader
    vNormal = normalize(normalMatrix * normal); // Transform and pass the normal vector
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
