uniform float time;

void main() {
    gl_PointSize = 3.0; // Adjust point size
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
