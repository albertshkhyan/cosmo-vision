uniform float time;                     // Time variable for animation
uniform sampler2D sunTexture;           // Sun surface texture
uniform float polarSpeedFactor;         // Ratio of polar to equatorial rotation speed
uniform float granulationIntensity;     // Intensity of granulation effect
uniform float surfaceIntensity;         // Surface texture intensity
uniform float plasmaFlowSpeed;          // Speed of plasma flow
uniform float coronaGlowStrength;       // Strength of corona glow
uniform float flareIntensity;           // Intensity of solar flares
uniform float radiantRayStrength;       // Strength of radiant rays
varying vec2 vUv;                       // UV coordinates
uniform float alphaTransparency;        // New uniform for alpha transparency


// 2D Noise generation
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Smooth noise using interpolation
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(noise(i + vec2(0.0, 0.0)), noise(i + vec2(1.0, 0.0)), u.x),
        mix(noise(i + vec2(0.0, 1.0)), noise(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

// Fractal Brownian Motion for complex patterns
float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
        total += amplitude * smoothNoise(p * frequency);
        amplitude *= 0.5;
        frequency *= 2.0;
    }
    return total;
}

// Granulation Effect
vec3 getGranulation(vec2 uv, float time) {
    float granulation = fbm(uv * 30.0 + time * 0.2) * granulationIntensity;
    return vec3(granulation, granulation * 0.6, 0.3 * granulation);
}

// Plasma Flow Effect
vec3 getPlasmaFlow(vec2 uv, float time) {
    float flow = sin(uv.y * 10.0 + time * plasmaFlowSpeed) * 0.02 +
    cos(uv.x * 10.0 + time * plasmaFlowSpeed * 0.8) * 0.02;
    return vec3(flow * 1.5, flow * 0.8, flow * 0.3);
}

// Corona Glow Effect
vec3 getCoronaGlow(vec2 uv, float strength) {
    float distance = length(uv - vec2(0.5)); // Հեռավորություն կենտրոնից
    float glow = exp(-pow(distance * strength * 0.1, 2.0)); // Գլոուի ուժգնության հաշվարկ
    glow = clamp(glow, 0.0, 1.0);           // Արժեքը սահմանափակում ենք 0.0-1.0 միջակայքում
    return vec3(1.0, 0.7, 0.4) * glow;      // Կիրառում ենք տաք գույն՝ նարնջագույնի երանգներով
}

// Radiant Rays Effect
//float getRadiantRays(vec2 uv, vec2 center, float time, float strength) {
//    vec2 direction = uv - center;            // Directional vector
//    float distance = length(direction);      // Distance from center
//    float angle = atan(direction.y, direction.x);
//
//    // Rays modulation
//    float rays = sin(angle * 20.0 + time * 2.0) * 0.5 + 0.5;
//    float fade = exp(-distance * 1.0);      // Exponential falloff for fading
//
//    return rays * fade * strength;           // Combined rays strength
//}

// Solar Flare Effect
float getSolarFlare(vec2 uv, float time) {
    float flare = sin(time * 2.0) * cos(uv.y * 20.0 + time * 0.5);
    return pow(abs(flare), 4.0) * 0.2;
}

void main() {
    vec2 uv = vUv;

    // Time modulation for smooth animations
    float timeMod = mod(time, 100.0);

    // Differential rotation effect
    float latitude = abs(uv.y - 0.5) * 2.0;
    float rotationFactor = mix(1.0, polarSpeedFactor, pow(latitude, 2.0));
    vec2 rotatingUV = vec2(mod(uv.x + timeMod * rotationFactor * 0.005, 1.0), uv.y);

    // Base Texture
    vec4 baseTexture = texture2D(sunTexture, rotatingUV) * surfaceIntensity;

    // Effects
    vec3 granulation = getGranulation(rotatingUV, timeMod);
    vec3 plasmaFlow = getPlasmaFlow(rotatingUV, timeMod);
    vec3 coronaGlow = getCoronaGlow(vUv, coronaGlowStrength);

    // Radiant Rays
//    float radiantRays = getRadiantRays(vUv, vec2(0.5), time, radiantRayStrength);

    // Solar Flare
    float flare = getSolarFlare(vUv, timeMod);

    // Combine effects
    vec3 finalColor = baseTexture.rgb + granulation + plasmaFlow;
    finalColor += coronaGlow;
//    finalColor += vec3(radiantRays);   // Add radiant rays as soft white light
    finalColor += vec3(flare, flare * 0.5, 0.2) * flareIntensity;

    // Output the final color
    gl_FragColor = vec4(finalColor, 1.0); // The 1.0 here represents the alpha channel (fully opaque)
}
