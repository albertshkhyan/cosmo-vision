#include "./prominenceUtils.glsl"

uniform float time;
uniform float intensity;
uniform vec2 resolution;
uniform float spread;
uniform float turbulenceStrength;
uniform float colorShift;
uniform float falloff;
uniform float distortionScale;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy; // Normalize UV coordinates
    uv -= 0.5; // Center UV coordinates
    uv *= spread; // Scale UV based on the spread uniform

    // Apply distortion for dynamic movement with distortionScale
    vec2 distortedUV = distort(uv, time * 1.8, distortionScale);

    // Calculate the distance from the center
    float dist = length(distortedUV);

    // Clamp the maximum distance to keep the prominence arcs closer to the Sun
    dist = clamp(dist, 0.0, 1.2); // Adjust the second value to limit the maximum distance

    // Apply the distortion back after clamping
    distortedUV *= dist;

    // Fire turbulence using fractal noise and turbulence strength
    float turbulence = fractalNoise(distortedUV * (7.0 + turbulenceStrength) + vec2(0.0, time * 0.4)) * turbulenceStrength;

    // Flicker effect to emulate flame dynamics
    float flicker = 0.7 + 0.3 * sin(time * 5.0 + uv.y * 10.0);

    // Combine turbulence and flicker for fire-like intensity
    float fireIntensity = intensity * (turbulence * flicker);

    // Radial gradient for natural flame falloff
    fireIntensity *= 1.0 - smoothstep(0.0, falloff, dist * 2.0 * (1.0 / spread)); // Adjust falloff dynamically

    // Final fire color using gradient with colorShift and time
    float timeFactor = sin(time * 0.5); // Use time factor for dynamic color shift
    vec3 fireColor = fireColorGradient(fireIntensity, timeFactor, colorShift);

    // Add dynamic transparency to the flames
    float alpha = smoothstep(0.0, 1.0, fireIntensity) * (1.0 - dist / (falloff * 1.2));

    // Output the final color and transparency
    gl_FragColor = vec4(fireColor, alpha);
}

