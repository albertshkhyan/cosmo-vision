uniform vec3 starColor;

void main() {
    // Set the star color
    gl_FragColor = vec4(starColor, 1.0);

    // Apply a fade effect based on the distance from the center
    float alpha = 1.0 - length(gl_PointCoord - vec2(0.5));
    gl_FragColor.a *= alpha;
}
