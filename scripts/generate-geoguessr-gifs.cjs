const GIFEncoder = require('gif-encoder');
const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, '../src/assets/images');

function createGeoGuessrGif(filename, width, height, frames) {
  return new Promise((resolve, reject) => {
    const encoder = new GIFEncoder(width, height);
    const filePath = path.join(outputDir, filename);
    const file = fs.createWriteStream(filePath);

    encoder.pipe(file);
    encoder.setRepeat(0);
    encoder.setDelay(120);
    encoder.setQuality(10);

    frames.forEach(frameData => {
      const frame = new Uint8Array(width * height * 4);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const pixel = frameData(x, y, width, height);
          frame[idx] = pixel[0];     // R
          frame[idx + 1] = pixel[1]; // G
          frame[idx + 2] = pixel[2]; // B
          frame[idx + 3] = 255;      // A
        }
      }
      encoder.addFrame(frame);
    });

    encoder.writeHeader();
    encoder.finish();

    file.on('finish', () => {
      console.log(`Created: ${filename}`);
      resolve();
    });
    file.on('error', reject);
  });
}

// Frame 1: Street view - green/brown landscape with road
function streetViewFrame1(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const roadY = h * 0.6;
  // Sky gradient
  if (y < h * 0.4) {
    const t = y / (h * 0.4);
    return [Math.round(100 + t * 50), Math.round(150 + t * 30), Math.round(200 + t * 20)];
  }
  // Road
  if (Math.abs(y - roadY) < h * 0.04) {
    return [80, 80, 85];
  }
  // Trees/vegetation
  if (x < w * 0.3 || x > w * 0.7) {
    return [60, 120 + Math.round(Math.sin(x * 0.1) * 20), 40];
  }
  // Ground
  return [130, 160, 90];
}

function streetViewFrame2(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const roadY = h * 0.62;
  if (y < h * 0.35) {
    const t = y / (h * 0.35);
    return [Math.round(120 + t * 40), Math.round(160 + t * 20), Math.round(210 + t * 15)];
  }
  if (Math.abs(y - roadY) < h * 0.04) {
    return [90, 90, 95];
  }
  if (x < w * 0.25 || x > w * 0.75) {
    return [50, 110 + Math.round(Math.sin(x * 0.08) * 15), 35];
  }
  return [140, 170, 100];
}

function streetViewFrame3(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const roadY = h * 0.58;
  if (y < h * 0.45) {
    const t = y / (h * 0.45);
    return [Math.round(80 + t * 60), Math.round(140 + t * 40), Math.round(190 + t * 25)];
  }
  if (Math.abs(y - roadY) < h * 0.04) {
    return [70, 70, 75];
  }
  if (x < w * 0.35 || x > w * 0.65) {
    return [55, 115 + Math.round(Math.sin(x * 0.12) * 25), 38];
  }
  return [125, 155, 85];
}

// Frame 1: Map with pin - blue/green map with a red pin
function mapPinFrame1(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const dx = x - cx, dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // Pin at center
  if (dist < 8) {
    return [220, 50, 50]; // Red pin
  }
  if (dist < 12 && dy > 0) {
    return [200, 40, 40];
  }
  // Map grid pattern
  const grid = (Math.floor(x / 20) + Math.floor(y / 20)) % 2;
  if (grid === 0) {
    return [180 + Math.round(Math.sin(x * 0.05) * 20), 200 + Math.round(Math.cos(y * 0.05) * 15), 140];
  }
  return [160, 180, 120];
}

function mapPinFrame2(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const dx = x - cx, dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 8) {
    return [230, 60, 60];
  }
  if (dist < 12 && dy > 0) {
    return [210, 50, 50];
  }
  const grid = (Math.floor(x / 20) + Math.floor(y / 20)) % 2;
  if (grid === 0) {
    return [190 + Math.round(Math.sin(x * 0.05 + 1) * 15), 210 + Math.round(Math.cos(y * 0.05 + 1) * 10), 150];
  }
  return [170, 190, 130];
}

function mapPinFrame3(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const dx = x - cx, dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 8) {
    return [240, 70, 70];
  }
  if (dist < 12 && dy > 0) {
    return [220, 60, 60];
  }
  const grid = (Math.floor(x / 20) + Math.floor(y / 20)) % 2;
  if (grid === 0) {
    return [200 + Math.round(Math.sin(x * 0.05 + 2) * 18), 220 + Math.round(Math.cos(y * 0.05 + 2) * 12), 160];
  }
  return [180, 200, 140];
}

async function main() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // GIF 1: GeoGuessr street view scene (320x180)
  await createGeoGuessrGif(
    'geoguessr-streetview.gif',
    320, 180,
    [streetViewFrame1, streetViewFrame2, streetViewFrame3]
  );

  // GIF 2: GeoGuessr map pinpoint scene (320x180)
  await createGeoGuessrGif(
    'geoguessr-pinpoint.gif',
    320, 180,
    [mapPinFrame1, mapPinFrame2, mapPinFrame3]
  );

  console.log('All GeoGuessr GIFs created successfully!');
}

main().catch(console.error);