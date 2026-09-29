// 2799 synth engine — zero assets, pure WebAudio bleeps.
let ctx: AudioContext | null = null;
let enabled = true;

try {
  enabled = localStorage.getItem('neo-sound') !== 'off';
} catch { /* ignore */ }

export const isSoundOn = () => enabled;

export const setSoundOn = (on: boolean) => {
  enabled = on;
  try {
    localStorage.setItem('neo-sound', on ? 'on' : 'off');
  } catch { /* ignore */ }
};

const ac = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

export const blip = (freq = 880, dur = 0.06, type: OscillatorType = 'square', gain = 0.03) => {
  if (!enabled) return;
  try {
    const c = ac();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(gain, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + dur);
  } catch { /* silent */ }
};

export const sfx = {
  hover: () => blip(1200, 0.03, 'sine', 0.015),
  click: () => blip(880, 0.06, 'square', 0.03),
  success: () => {
    blip(660, 0.07, 'square', 0.03);
    setTimeout(() => blip(990, 0.09, 'square', 0.03), 80);
  },
  levelup: () => {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => blip(f, 0.12, 'sawtooth', 0.035), i * 110));
  },
  boot: () => {
    [220, 440, 880].forEach((f, i) => setTimeout(() => blip(f, 0.15, 'sawtooth', 0.03), i * 150));
  },
};
