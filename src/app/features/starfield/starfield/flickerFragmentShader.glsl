uniform float time;
uniform sampler2D map;
uniform vec3 starColor;

void main() {
    // Sample the texture
    vec4 textureColor = texture2D(map, gl_PointCoord);

    // Flickering effect using a sine wave
    float flicker = 0.5 + 0.5 * sin(time * 5.0 + gl_FragCoord.x * 0.1);

    // Combine texture color with star color
    vec4 finalColor = vec4(starColor, 1.0) * textureColor;

    // Apply flicker to the alpha channel
    finalColor.a *= flicker;

    // Discard the fragment if it's fully transparent
    if (finalColor.a < 0.1) discard;

    gl_FragColor = finalColor;
}
