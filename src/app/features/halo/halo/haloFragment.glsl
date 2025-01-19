
uniform float time;            // Time variable for dynamic effects
uniform float cameraDistance;  // Control light falloff scaling
uniform float glowColorR;      // Red component of glow color
uniform float glowColorG;      // Green component of glow color
uniform float glowColorB;      // Blue component of glow color
//uniform float brightness; // New uniform to control the brightness of the halo
//uniform float transparencyFactor; // Control the transparency of the halo dynamically

uniform float haloBrightness;           // Uniform to control the brightness of the halo
uniform float edgeTransparencyFactor;   // Control the smooth transparency for edges
uniform float globalAlpha;              // Uniform to control the overall alpha of the halo
varying vec2 vUv;              // UV coordinates for texture mapping

// Random noise for surface granulation
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

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

// Calculate Fresnel effect for edge highlights
float fresnelEffect(vec2 center, float distance) {
    float fresnel = 1.0 - dot(normalize(center), vec2(0.0, 0.0));
    return pow(clamp(fresnel, 0.0, 1.0), 3.0);
}

// Simulate pulsation effect for the halo
float pulsation(float distance, float time) {
    return 1.0 + 0.1 * sin(time * 3.0 + distance * 20.0); // Stronger pulsation
}
// Final transparency calculation, with separate logic for edge and global alpha
float calculateEdgeTransparency(float distance, float factor) {
    if (factor <= 0.0) {
        return 1.0; // Ignore edge transparency and let global alpha take full control
    }
    float edgeTransparency = smoothstep(0.5, 1.2, 1.0 - distance);
    return pow(edgeTransparency, 1.5) * factor;
}

float calculateGlobalAlpha(float edgeTransparency, float alphaFactor, float edgeFactor) {
    if (edgeFactor <= 0.0) {
        return alphaFactor; // Use only globalAlpha when edge transparency is disabled
    }
    return edgeTransparency * alphaFactor;
}

void main() {
    vec2 center = vUv - vec2(0.5, 0.5); // Center of the sphere
    float distance = length(center);

    // Fresnel effect for edge glow
    float fresnel = fresnelEffect(center, distance);

    // Adjust light falloff dynamically based on cameraDistance
    float falloff = 1.0 / (1.0 + distance * distance * cameraDistance * 5.0);

    // Dynamic pulsation
    float pulse = pulsation(distance, time);

    // Layered glow
    float innerGlow = exp(-distance * 10.0) * 4.0 * pulse;
    float midGlow = exp(-distance * 6.0) * 2.0 * pulse;
    float outerGlow = exp(-distance * 3.0) * 1.5 * pulse;

    float glow = innerGlow + midGlow + outerGlow;

    // Apply brightness uniform to the glow
    glow *= haloBrightness;

    // Solar granulation (fine surface noise)
    float granulation = smoothNoise(vUv * 50.0 + time * 0.1) * 0.03;
    glow += granulation; // Add noise to glow for realism

    // Dynamic glow color based on user controls
    vec3 glowColor = vec3(glowColorR, glowColorG, glowColorB);
    vec3 chromaticGlow = glowColor * glow;

    // Atmospheric scattering: brighter edges
    float scattering = pow(1.0 - distance, 4.0) * 0.8;
    chromaticGlow += vec3(1.0, 0.8, 0.4) * scattering * fresnel;

    // Combine glow, falloff, and Fresnel effect
    vec3 finalColor = chromaticGlow * falloff * fresnel * haloBrightness * 1.2; // Slight boost

    // Separate transparency logic
    float edgeTransparency = calculateEdgeTransparency(distance, edgeTransparencyFactor);
    float alpha = calculateGlobalAlpha(edgeTransparency, globalAlpha, edgeTransparencyFactor);

    // Output final color with alpha transparency
    gl_FragColor = vec4(finalColor, alpha);
}

