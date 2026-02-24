const fs = require('fs');
const image = fs.readFileSync('public/assets/images/bgs/textured-paper-bg1.png');

// A very basic check to see if the image has an alpha channel.
// PNG header: 89 50 4E 47 0D 0A 1A 0A
// IHDR chunk: Length (4), Chunk Type (4), Width (4), Height (4), Bit Depth (1), Color Type (1), ...
// IHDR is usually at offset 8.
// The Color Type is at offset 8 + 4 + 4 + 4 + 4 + 1 = 25.
const colorType = image[25];
console.log('Color Type:', colorType);
// Color types:
// 0: Grayscale
// 2: Truecolor
// 3: Indexed
// 4: Grayscale + Alpha
// 6: Truecolor + Alpha
