uniform sampler2D earthDayTexture;    // Day texture
uniform sampler2D earthNightTexture;  // Night texture
uniform sampler2D earthCloudsTexture; // Clouds texture
uniform vec3 lightDirection;          // Sunlight direction
uniform float time;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    // Rotate UVs over time to simulate Earth's rotation
    vec2 rotatedUv = vec2(
    mod(vUv.x + time * 0.02, 1.0), // Slower rotation for a more realistic effect
    vUv.y
    );

    // Sample day, night, and clouds textures
    vec4 dayColor = texture2D(earthDayTexture, rotatedUv);
    vec4 nightColor = texture2D(earthNightTexture, rotatedUv);
    vec4 cloudColor = texture2D(earthCloudsTexture, rotatedUv);

    // Compute light intensity using normal and light direction
    vec3 normal = normalize(vNormal);
    float lightIntensity = max(dot(normal, normalize(lightDirection)), 0.0);

    // ========== 🌓 Improved Day-Night Transition ==========
    // Uses a **smoother** transition between day and night to avoid a sharp cutoff
    float transition = smoothstep(0.05, 0.5, lightIntensity); // Better blending between night and day
    vec3 blendedEarth = mix(nightColor.rgb * 1.8, dayColor.rgb, transition); // Boost night brightness

    // ========== 🌆 Enhance City Lights at Night ==========
    // Night side brightness enhancement for city lights
    vec3 nightEnhancement = nightColor.rgb * vec3(2.2, 2.2, 1.8); // Slightly warmer glow for city lights
    vec3 enhancedNight = mix(nightEnhancement, dayColor.rgb, transition); // Keep transition smooth

    // Blend in clouds while keeping them slightly transparent
    vec3 finalColor = mix(enhancedNight, cloudColor.rgb * 0.9, cloudColor.a * 0.5);

    // ========== ☀️ Enhance Sunlit Areas ==========
    // Increase brightness for areas facing the sun
    vec3 sunBoost = mix(vec3(1.0), dayColor.rgb, 0.7); // Sun-exposed areas look brighter
    finalColor = mix(finalColor, sunBoost, smoothstep(0.8, 1.0, lightIntensity)); // Subtle brightness boost

    // Output final color
    gl_FragColor = vec4(finalColor, 1.0);
}
