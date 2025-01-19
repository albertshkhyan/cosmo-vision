// Enhanced color gradient for fire with dynamic time-based variations
vec3 fireColorGradient(float t, float timeFactor, float colorShift) {
    return mix(
        vec3(1.0, 0.2 + colorShift * sin(timeFactor * 1.5), 0.0),        // Deep red-orange shifted dynamically
        mix(
            vec3(1.0, 0.5 + colorShift * 0.7 * cos(timeFactor * 1.3), 0.15),    // Bright orange with time-based yellow tones
            vec3(1.0 - colorShift * 0.3, 0.95, 0.35 + colorShift * 0.6 * sin(timeFactor * 1.2)),   // Smooth yellow-white shift
            pow(t, 1.2) // Adjust gradient blending with non-linear interpolation
        ),
        pow(t, 0.8) // Smooth transitions using exponential curve
    );
}

// Improved noise function with reduced artifacts
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// Smooth noise with cubic interpolation for finer details
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f); // Cubic interpolation for smoother blending

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal noise with improved weighting for smoother detail blending
float fractalNoise(vec2 p) {
    float n = 0.0;
    float amplitude = 1.0; // Amplitude for noise layers
    float frequency = 1.0; // Frequency for noise layers
    float totalAmplitude = 0.0;

    for (int i = 0; i < 6; i++) {
        n += smoothNoise(p * frequency) * amplitude;
        totalAmplitude += amplitude;
        amplitude *= 0.5; // Decrease amplitude for each octave
        frequency *= 2.0; // Increase frequency for each octave
    }

    return n / totalAmplitude; // Normalize the result
}

// Distortion function with multi-directional flow and rotational dynamics
vec2 distort(vec2 uv, float t, float distortionScale) {
    uv.x += sin(uv.y * 20.0 + t * 1.2) * distortionScale * 0.35; // Horizontal distortion with dynamic flow
    uv.y += cos(uv.x * 20.0 - t * 1.5) * distortionScale * 0.35; // Vertical distortion with dynamic flow

    // Add finer distortions for intricate motion
    uv += distortionScale * 0.08 * vec2(
    sin(uv.y * 10.0 + t * 3.0),
    cos(uv.x * 10.0 - t * 2.8)
    );

    // Introduce rotational distortion for plasma-like behavior
    float rotation = sin(t * 0.6) * 0.2;
    mat2 rotationMatrix = mat2(
    cos(rotation), -sin(rotation),
    sin(rotation), cos(rotation)
    );
    uv = rotationMatrix * uv;

    // Add radial flow distortion for a more organic feel
    uv += 0.03 * vec2(
    cos(length(uv) * 8.0 + t * 0.7),
    sin(length(uv) * 8.0 - t * 0.9)
    );

    return uv;
}
