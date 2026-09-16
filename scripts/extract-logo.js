import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import UTIF from '../node_modules/three/examples/jsm/libs/utif.module.js';

// CRC32 table for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const typeBuf = Buffer.from(type, 'ascii');
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  typeBuf.copy(buf, 4);
  data.copy(buf, 8);
  const toCrc = Buffer.concat([typeBuf, data]);
  buf.writeUInt32BE(crc32(toCrc), 8 + len);
  return buf;
}

function encodePNG(width, height, rgbaBuffer) {
  const rowBytes = width * 4;
  const rawBuf = Buffer.alloc(height * (1 + rowBytes));
  for (let y = 0; y < height; y++) {
    const rawOffset = y * (1 + rowBytes);
    rawBuf[rawOffset] = 0; // Filter None
    rgbaBuffer.copy(rawBuf, rawOffset + 1, y * rowBytes, (y + 1) * rowBytes);
  }

  const compressed = zlib.deflateSync(rawBuf, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

export function extractVisakaLogos() {
  try {
    const filePath = path.resolve('src/assets/logo/Visaka Paints Logo.jpg.jpeg');
    if (!fs.existsSync(filePath)) {
      console.warn('[LogoExtractor] Source file not found:', filePath);
      return;
    }

    const fileBuf = fs.readFileSync(filePath);
    const decoder = new UTIF.JpegDecoder();
    decoder.parse(new Uint8Array(fileBuf));
    const fullW = decoder.width;
    const fullH = decoder.height;
    console.log(`[LogoExtractor] Decoded image dimensions: ${fullW}x${fullH}`);

    // UTIF decoder returns 3 bytes/pixel RGB Uint8ClampedArray when forceRGB: true
    const rgbData = decoder.getData({ width: fullW, height: fullH, forceRGB: true });
    const bytesPerPx = Math.round(rgbData.length / (fullW * fullH));

    function getRGB(x, y) {
      const idx = (y * fullW + x) * bytesPerPx;
      return [rgbData[idx], rgbData[idx + 1], rgbData[idx + 2]];
    }

    // Inspect background color around (100, 100)
    let sumR = 0, sumG = 0, sumB = 0, count = 0;
    for (let sy = 60; sy < 120; sy++) {
      for (let sx = 60; sx < 120; sx++) {
        const [r, g, b] = getRGB(sx, sy);
        sumR += r; sumG += g; sumB += b; count++;
      }
    }
    const bgWhiteR = Math.round(sumR / count);
    const bgWhiteG = Math.round(sumG / count);
    const bgWhiteB = Math.round(sumB / count);
    console.log(`[LogoExtractor] White section background color: rgb(${bgWhiteR}, ${bgWhiteG}, ${bgWhiteB})`);

    // Sample blue background color from top-right quadrant (e.g. at fullW - 60, 80)
    let bSumR = 0, bSumG = 0, bSumB = 0, bCount = 0;
    for (let sy = 60; sy < 120; sy++) {
      for (let sx = fullW - 120; sx < fullW - 60; sx++) {
        const [r, g, b] = getRGB(sx, sy);
        bSumR += r; bSumG += g; bSumB += b; bCount++;
      }
    }
    const sampleBlueR = Math.round(bSumR / bCount);
    const sampleBlueG = Math.round(bSumG / bCount);
    const sampleBlueB = Math.round(bSumB / bCount);
    console.log(`[LogoExtractor] Blue section background color: rgb(${sampleBlueR}, ${sampleBlueG}, ${sampleBlueB})`);

    // Outer sheet margin to ignore outer borders/cut-lines (skip first 25px around edge)
    const margin = 28;

    const midX = Math.floor(fullW * 0.50);
    const midY = Math.floor(fullH * 0.50);
    // Ignore color swatches at the bottom of the left column (swatches start ~0.82)
    const bottomContentMaxY = Math.floor(fullH * 0.78);

    // 4 variants from the 4 quadrants:
    const variants = [
      {
        name: 'visaka-paints-logo', // Top-Left: Red + Blue text (for light backgrounds)
        startX: margin,
        endX: midX - margin,
        startY: margin,
        endY: midY - margin,
        bgType: 'white',
      },
      {
        name: 'visaka-paints-white-logo', // Top-Right: Red + White text (for dark backgrounds/navbar)
        startX: midX + margin,
        endX: fullW - margin,
        startY: margin,
        endY: midY - margin,
        bgType: 'blue',
      },
      {
        name: 'visaka-chemicals-logo', // Bottom-Left: Red + Blue text (corporate name for light)
        startX: margin,
        endX: midX - margin,
        startY: midY + margin,
        endY: bottomContentMaxY,
        bgType: 'white',
      },
      {
        name: 'visaka-chemicals-white-logo', // Bottom-Right: Red + White text (corporate name for dark)
        startX: midX + margin,
        endX: fullW - margin,
        startY: midY + margin,
        endY: bottomContentMaxY,
        bgType: 'blue',
      },
    ];

    for (const v of variants) {
      let minX = v.endX, maxX = v.startX, minY = v.endY, maxY = v.startY;

      const bgR = v.bgType === 'white' ? bgWhiteR : sampleBlueR;
      const bgG = v.bgType === 'white' ? bgWhiteG : sampleBlueG;
      const bgB = v.bgType === 'white' ? bgWhiteB : sampleBlueB;

      for (let y = v.startY; y <= v.endY; y++) {
        for (let x = v.startX; x <= v.endX; x++) {
          const [r, g, b] = getRGB(x, y);
          const dist = Math.sqrt((bgR - r) ** 2 + (bgG - g) ** 2 + (bgB - b) ** 2);
          if (dist > 36) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (minX > maxX || minY > maxY) {
        console.warn(`[LogoExtractor] Variant ${v.name} was empty!`);
        continue;
      }

      const pad = 24;
      const cropX = Math.max(v.startX, minX - pad);
      const cropY = Math.max(v.startY, minY - pad);
      const cropW = Math.min(v.endX, maxX + pad) - cropX + 1;
      const cropH = Math.min(v.endY, maxY + pad) - cropY + 1;

      console.log(`[LogoExtractor] Cropping ${v.name}: box [${minX}, ${minY}, ${maxX}, ${maxY}] -> final [${cropW}x${cropH}]`);

      const outRgba = Buffer.alloc(cropW * cropH * 4);

      for (let cy = 0; cy < cropH; cy++) {
        for (let cx = 0; cx < cropW; cx++) {
          const srcX = cropX + cx;
          const srcY = cropY + cy;
          const [r, g, b] = getRGB(srcX, srcY);
          const dstIdx = (cy * cropW + cx) * 4;

          if (v.bgType === 'white') {
            const diffR = bgWhiteR - r;
            const diffG = bgWhiteG - g;
            const diffB = bgWhiteB - b;
            const dist = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

            if (dist < 28) {
              outRgba[dstIdx] = 0;
              outRgba[dstIdx + 1] = 0;
              outRgba[dstIdx + 2] = 0;
              outRgba[dstIdx + 3] = 0;
            } else {
              let alpha = 1.0;
              if (dist < 95) alpha = (dist - 28) / (95 - 28);
              const effectiveAlpha = Math.max(alpha, 0.08);
              outRgba[dstIdx] = Math.min(255, Math.max(0, Math.round((r - bgWhiteR * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 1] = Math.min(255, Math.max(0, Math.round((g - bgWhiteG * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 2] = Math.min(255, Math.max(0, Math.round((b - bgWhiteB * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 3] = Math.round(alpha * 255);
            }
          } else {
            // Blue background un-premultiplication
            const diffR = sampleBlueR - r;
            const diffG = sampleBlueG - g;
            const diffB = sampleBlueB - b;
            const dist = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

            if (dist < 28) {
              outRgba[dstIdx] = 0;
              outRgba[dstIdx + 1] = 0;
              outRgba[dstIdx + 2] = 0;
              outRgba[dstIdx + 3] = 0;
            } else {
              let alpha = 1.0;
              if (dist < 100) alpha = (dist - 28) / (100 - 28);
              const effectiveAlpha = Math.max(alpha, 0.08);
              // For white text and red icon on blue background:
              outRgba[dstIdx] = Math.min(255, Math.max(0, Math.round((r - sampleBlueR * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 1] = Math.min(255, Math.max(0, Math.round((g - sampleBlueG * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 2] = Math.min(255, Math.max(0, Math.round((b - sampleBlueB * (1 - alpha)) / effectiveAlpha)));
              outRgba[dstIdx + 3] = Math.round(alpha * 255);
            }
          }
        }
      }

      const pngBuf = encodePNG(cropW, cropH, outRgba);

      const targets = [
        path.resolve(`src/assets/logo/${v.name}.png`),
        path.resolve(`public/assets/brand/${v.name}.png`),
      ];

      for (const t of targets) {
        fs.mkdirSync(path.dirname(t), { recursive: true });
        fs.writeFileSync(t, pngBuf);
        console.log(`[LogoExtractor] Saved: ${t} (${(pngBuf.length / 1024).toFixed(1)} KB)`);
      }

      // Generate SVG wrapper for crisp vector scaling
      const b64 = pngBuf.toString('base64');
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cropW} ${cropH}" width="${cropW}" height="${cropH}">
  <image href="data:image/png;base64,${b64}" width="${cropW}" height="${cropH}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
      fs.writeFileSync(path.resolve(`src/assets/logo/${v.name}.svg`), svgContent);
      fs.writeFileSync(path.resolve(`public/assets/brand/${v.name}.svg`), svgContent);

      // Convenience aliases:
      if (v.name === 'visaka-chemicals-logo') {
        fs.writeFileSync(path.resolve('src/assets/logo/visaka-logo.png'), pngBuf);
        fs.writeFileSync(path.resolve('public/assets/brand/visaka-logo.png'), pngBuf);
      }
      if (v.name === 'visaka-chemicals-white-logo') {
        fs.writeFileSync(path.resolve('src/assets/logo/visaka-logo-white.png'), pngBuf);
        fs.writeFileSync(path.resolve('public/assets/brand/visaka-logo-white.png'), pngBuf);
      }
    }

    // Also extract the Red "V" Emblem standalone
    let vMinX = fullW, vMaxX = 0, vMinY = fullH, vMaxY = 0;
    const vSearchW = Math.floor(fullW * 0.35);
    const vSearchH = Math.floor(fullH * 0.45);

    for (let y = 0; y < vSearchH; y++) {
      for (let x = 0; x < vSearchW; x++) {
        const [r, g, b] = getRGB(x, y);
        if (r > 130 && r > g * 1.5 && r > b * 1.5) {
          if (x < vMinX) vMinX = x;
          if (x > vMaxX) vMaxX = x;
          if (y < vMinY) vMinY = y;
          if (y > vMaxY) vMaxY = y;
        }
      }
    }

    if (vMinX <= vMaxX && vMinY <= vMaxY) {
      const pad = 16;
      const vX = Math.max(0, vMinX - pad);
      const vY = Math.max(0, vMinY - pad);
      const vW = Math.min(vSearchW - 1, vMaxX + pad) - vX + 1;
      const vH = Math.min(vSearchH - 1, vMaxY + pad) - vY + 1;

      const vRgba = Buffer.alloc(vW * vH * 4);
      for (let cy = 0; cy < vH; cy++) {
        for (let cx = 0; cx < vW; cx++) {
          const [r, g, b] = getRGB(vX + cx, vY + cy);
          const dstIdx = (cy * vW + cx) * 4;

          const diffR = 255 - r;
          const diffG = 255 - g;
          const diffB = 255 - b;
          const dist = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB);

          if (dist < 14) {
            vRgba[dstIdx] = 0;
            vRgba[dstIdx + 1] = 0;
            vRgba[dstIdx + 2] = 0;
            vRgba[dstIdx + 3] = 0;
          } else {
            let alpha = 1.0;
            if (dist < 85) alpha = (dist - 14) / (85 - 14);
            const effectiveAlpha = Math.max(alpha, 0.08);
            vRgba[dstIdx] = Math.min(255, Math.max(0, Math.round((r - 255 * (1 - alpha)) / effectiveAlpha)));
            vRgba[dstIdx + 1] = Math.min(255, Math.max(0, Math.round((g - 255 * (1 - alpha)) / effectiveAlpha)));
            vRgba[dstIdx + 2] = Math.min(255, Math.max(0, Math.round((b - 255 * (1 - alpha)) / effectiveAlpha)));
            vRgba[dstIdx + 3] = Math.round(alpha * 255);
          }
        }
      }

      const vPng = encodePNG(vW, vH, vRgba);
      fs.writeFileSync(path.resolve('src/assets/logo/visaka-icon.png'), vPng);
      fs.writeFileSync(path.resolve('public/assets/brand/visaka-icon.png'), vPng);

      const vB64 = vPng.toString('base64');
      const vSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vW} ${vH}" width="${vW}" height="${vH}">
  <image href="data:image/png;base64,${vB64}" width="${vW}" height="${vH}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
      fs.writeFileSync(path.resolve('src/assets/logo/visaka-icon.svg'), vSvg);
      fs.writeFileSync(path.resolve('public/assets/brand/visaka-icon.svg'), vSvg);
      console.log(`[LogoExtractor] Saved: visaka-icon.png [${vW}x${vH}] (${(vPng.length / 1024).toFixed(1)} KB)`);
    }

    console.log('[LogoExtractor] SUCCESS: All transparent logos extracted!');
  } catch (err) {
    console.error('[LogoExtractor] ERROR:', err);
  }
}
