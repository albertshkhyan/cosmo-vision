uniform sampler2D earthTexture; // Earth texture
uniform vec3 lightDirection;    // Direction of the light (Sun)
uniform float time;             // Animation time for rotation
varying vec2 vUv;               // UV coordinates
varying vec3 vNormal;           // Normal vector

void main() {
    // Rotate UVs over time to simulate Earth's rotation
    vec2 rotatedUv = vec2(
    mod(vUv.x + time * 0.05, 1.0),
    vUv.y
    );

    // Sample Earth texture
    vec4 baseColor = texture2D(earthTexture, rotatedUv);

    // Compute lighting (diffuse)
    // Commented out to disable shadow effect
     vec3 normal = normalize(vNormal); // Use the interpolated normal
     float lightIntensity = max(dot(normal, normalize(lightDirection)), 0.0);
     vec3 litColor = baseColor.rgb * lightIntensity;

    // Directly use the texture color without lighting
//    vec3 litColor = baseColor.rgb;

    // Output the final color
    gl_FragColor = vec4(litColor, baseColor.a);
}
