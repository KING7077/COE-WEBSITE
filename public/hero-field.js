/* Live 2-D heat equation for the home-page hero.

   dT/dt = alpha * laplacian(T) - kappa * T (diffusion with heat loss),
   solved with explicit finite differences
   (FTCS) on a coarse grid. Three fixed hot spots act as sources, the edges
   are held at T = 0, and the pointer adds heat where it moves. The field
   is drawn through the "plasma" colormap with contour lines every 0.1.

   The solver stops once the field reaches steady state, so the page is
   idle unless someone interacts. With reduced motion, only the steady
   state is drawn. */

(() => {
  const canvas = document.querySelector('.hero-field');
  if (!canvas) return;
  const hero = canvas.closest('.hero');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // plasma colormap, 9 stops
  const STOPS = [
    [13, 8, 135], [75, 3, 161], [126, 3, 168], [177, 42, 144], [204, 71, 120],
    [225, 100, 98], [242, 132, 75], [252, 166, 54], [240, 249, 33],
  ];
  const LUT = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const x = (i / 255) * (STOPS.length - 1);
    const k = Math.min(Math.floor(x), STOPS.length - 2);
    const f = x - k;
    for (let c = 0; c < 3; c++) LUT[i * 3 + c] = STOPS[k][c] + (STOPS[k + 1][c] - STOPS[k][c]) * f;
  }

  const R = 0.22;           // alpha * dt / dx^2  (stable below 0.25)
  const K = 0.0005;         // kappa * dt: heat loss, keeps warmth near the sources
  const STEPS = 14;         // solver steps per frame
  let W, H, T, Tn, fixed, img, off, octx;
  let running = false;
  let lastPointer = 0;
  let visible = true;

  // Hot spots in relative coordinates; kept to the right so the text stays legible.
  function sources(aspect) {
    return aspect > 1.1
      ? [{ x: .80, y: .30, r: .018, t: 1.0 }, { x: .93, y: .72, r: .015, t: .9 }, { x: .66, y: .86, r: .013, t: .8 }]
      : [{ x: .80, y: .12, r: .03, t: 1.0 }, { x: .38, y: .05, r: .025, t: .85 }, { x: .97, y: .985, r: .025, t: .75 }];
  }

  function setup() {
    const rect = hero.getBoundingClientRect();
    const aspect = rect.width / Math.max(rect.height, 1);
    W = aspect >= 1 ? 220 : Math.round(150 * aspect);
    H = aspect >= 1 ? Math.round(220 / aspect) : 150;
    W = Math.max(W, 40); H = Math.max(H, 40);

    T = new Float32Array(W * H);
    Tn = new Float32Array(W * H);
    fixed = new Float32Array(W * H).fill(-1);
    sources(aspect).forEach(s => {
      const cx = s.x * W, cy = s.y * H, rr = s.r * Math.max(W, H);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        if ((x - cx) ** 2 + (y - cy) ** 2 <= rr * rr) fixed[y * W + x] = s.t;
      }
    });

    // Render at 2x the grid and let the browser smooth the final upscale.
    off = document.createElement('canvas');
    off.width = W * 2; off.height = H * 2;
    octx = off.getContext('2d');
    img = octx.createImageData(off.width, off.height);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }

  function step() {
    let change = 0;
    for (let y = 1; y < H - 1; y++) {
      const row = y * W;
      for (let x = 1; x < W - 1; x++) {
        const i = row + x;
        const f = fixed[i];
        if (f >= 0) { Tn[i] = f; continue; }
        const v = T[i] + R * (T[i - 1] + T[i + 1] + T[i - W] + T[i + W] - 4 * T[i]) - K * T[i];
        change += Math.abs(v - T[i]);
        Tn[i] = v;
      }
    }
    const tmp = T; T = Tn; Tn = tmp;
    return change / (W * H);
  }

  let V; // interpolated field at render resolution

  function draw() {
    const SW = off.width, SH = off.height, d = img.data;
    if (!V || V.length !== SW * SH) V = new Float32Array(SW * SH);
    const sx = (W - 1) / (SW - 1), sy = (H - 1) / (SH - 1);
    for (let py = 0; py < SH; py++) {
      const gy = py * sy, y0 = gy | 0, y1 = Math.min(y0 + 1, H - 1), fy = gy - y0;
      for (let px = 0; px < SW; px++) {
        const gx = px * sx, x0 = gx | 0, x1 = Math.min(x0 + 1, W - 1), fx = gx - x0;
        const a = T[y0 * W + x0], b = T[y0 * W + x1], c = T[y1 * W + x0], e = T[y1 * W + x1];
        const v = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + e * fx) * fy;
        V[py * SW + px] = v < 0 ? 0 : v > 1 ? 1 : v;
      }
    }
    for (let py = 0; py < SH; py++) {
      for (let px = 0; px < SW; px++) {
        const i = py * SW + px, v = V[i];
        const k = (Math.pow(v, 0.7) * 255) | 0;
        let r = LUT[k * 3], g = LUT[k * 3 + 1], bl = LUT[k * 3 + 2];
        // Contour every 0.1 in T, drawn about one pixel wide whatever the slope.
        if (v > 0.03) {
          const gxv = V[i + (px < SW - 1 ? 1 : 0)] - V[i - (px > 0 ? 1 : 0)];
          const gyv = V[i + (py < SH - 1 ? SW : 0)] - V[i - (py > 0 ? SW : 0)];
          const grad = Math.hypot(gxv, gyv) * 0.5 * 10 + 1e-6;
          const band = v * 10, dist = Math.abs(band - Math.round(band)) / grad;
          if (dist < 0.9) {
            const a = 0.45 * (1 - dist / 0.9);
            r += (255 - r) * a; g += (255 - g) * a; bl += (255 - bl) * a;
          }
        }
        const o = i * 4;
        d[o] = r; d[o + 1] = g; d[o + 2] = bl; d[o + 3] = 255;
      }
    }
    octx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  }

  function loop() {
    if (!visible) { running = false; return; }
    let change = 0;
    for (let s = 0; s < STEPS; s++) change = step();
    draw();
    const active = performance.now() - lastPointer < 300;
    if (change > 2e-5 || active) requestAnimationFrame(loop);
    else running = false;
  }

  function start() {
    if (!running && !reduceMotion) { running = true; requestAnimationFrame(loop); }
  }

  function heat(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const cx = ((clientX - rect.left) / rect.width) * W;
    const cy = ((clientY - rect.top) / rect.height) * H;
    const rad = Math.max(W, H) * 0.035;
    for (let y = Math.max(1, (cy - rad * 2) | 0); y < Math.min(H - 1, cy + rad * 2); y++) {
      for (let x = Math.max(1, (cx - rad * 2) | 0); x < Math.min(W - 1, cx + rad * 2); x++) {
        const i = y * W + x;
        if (fixed[i] >= 0) continue;
        const g = Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (rad * rad));
        T[i] = Math.min(1, T[i] + 0.18 * g);
      }
    }
    lastPointer = performance.now();
    start();
  }

  function settle() {
    // Jump straight to (near) steady state.
    for (let s = 0; s < 6000; s++) if (step() < 1e-6 && s > 200) break;
    draw();
  }

  setup();
  if (reduceMotion) {
    settle();
  } else {
    draw();
    start();
    hero.addEventListener('pointermove', e => heat(e.clientX, e.clientY));
    hero.addEventListener('pointerdown', e => heat(e.clientX, e.clientY));
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setup();
      if (reduceMotion) settle(); else { draw(); start(); }
    }, 150);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }).observe(hero);
  }
})();
