uniform float time;
uniform float motionSpeed;
uniform float starDensity;

void main() {
    // Calculate a random position for each star based on its index
    float index = float(gl_VertexID);

    float seed = index / starDensity;
    float angle = seed * 6.28318; // Random angle around the origin
    float radius = sqrt(seed) * 1000.0; // Distance from the center
    float height = fract(sin(seed * 1000.0) * 43758.5453) * 2000.0 - 1000.0;

    vec3 position = vec3(
    cos(angle) * radius,
    sin(angle) * radius,
    height
    );

    // Animate stars along the Z-axis
    position.z += time * motionSpeed;

    // Wrap stars around when they move past the threshold
    if (position.z > 1000.0) {
        position.z = -1000.0;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
