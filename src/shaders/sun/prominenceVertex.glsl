uniform float time;

void main() {
    vec3 transformed = position;

    // Add oscillating movement to the prominence
    transformed.x += sin(time * 1.5 + position.y) * 0.15;
    transformed.y += cos(time * 1.5 + position.x) * 0.1;
    transformed.z += sin(time * 2.0 + position.z) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
