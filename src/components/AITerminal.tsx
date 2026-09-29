import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data/config';
import styles from './AITerminal.module.css';

interface Line {
  cmd?: string;
  out: string;
  sys?: boolean;
}

const HELP = `available ops:
  whoami ........ operator profile
  arsenal ....... list weapons / skills
  ops ........... list operations / projects
  contact ....... open secure channel
  timejump ...... 2199 → 2799 warp log
 hack .......... run fake breach sim
  clear ......... wipe terminal`;

const RESPONSES: Record<string, string> = {
  whoami: `${siteConfig.developer.fullName} // ${siteConfig.developer.title} — ${siteConfig.developer.tagline}`,
  arsenal: 'Python ▸ Go ▸ Rust ▸ TypeScript // Burp ▸ Nmap ▸ eBPF ▸ Tor ▸ Wireshark ▸ Ghidra // K8s ▸ Redis ▸ Next.js',
  ops: 'shadow-relay (E2E chat) ▸ ghost-scan (65k ports/8s) ▸ zero-trace (shredder) ▸ gray-phish-guard (ML) ▸ ai-redteam ▸ kernel-ghost (eBPF)',
  contact: `SECURE CHANNEL: ${siteConfig.contact.email} // response < 24h // GPG on request`,
  timejump: '2199: grid founded → 2340: quantum net → 2512: neural mesh → 2799: YOU ARE HERE. operator survived all forks.',
};

const HACK_LINES = [
  'injecting quantum payload...',
  'bypassing neural firewall [▓▓▓▓▓▓░░░░] 60%',
  'escalating to root-mesh... OK',
  'exfiltrating 0 bytes (ethical mode)... DONE',
  'target hardened. report written to /ops/log.',
];

export const AITerminal = () => {
  const [lines, setLines] = useState<Line[]>([
    { out: 'NEURAL TERMINAL v27.99 — type `help` to begin. Year: 2799.', sys: true },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const print = (out: string, sys = false, cmd?: string) =>
    setLines((prev) => [...prev, { out, sys, cmd }]);

  const runHack = () => {
    HACK_LINES.forEach((l, i) => {
      setTimeout(() => print(l, true), 350 * (i + 1));
    });
  };

  const exec = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') {
      setLines([]);
      return;
    }
    if (cmd === 'help') return print(HELP, false, raw);
    if (cmd === 'hack') {
      print(`$ ${raw}`, true);
      runHack();
      return;
    }
    if (RESPONSES[cmd]) return print(RESPONSES[cmd], false, raw);
    if (cmd.startsWith('echo ')) return print(raw.slice(5), false, raw);
    print(`unknown op: "${raw}". try: help`, true, raw);
  };

  return (
    <section id="terminal" className={styles.section} aria-labelledby="terminal-title">
      <div className={styles.container}>
        <p className="term-prompt">$ neural_link --year 2799 --interactive</p>
        <h2 id="terminal-title" className={styles.title}>
          Talk to the <span className={styles.accent}>Machine</span>
        </h2>
        <p className={styles.sub}>
          A 2799 sentient console. No backend — pure client-side ghost AI. Try <code>hack</code>.
        </p>

        <div className={styles.term} onClick={() => inputRef.current?.focus()}>
          <div className={styles.bar}>
            <span className={styles.d} />
            <span className={styles.d} />
            <span className={styles.d} />
            <span className={styles.addr}>ghost@neo-grid:~/2799</span>
          </div>
          <div className={styles.body} ref={bodyRef}>
            {lines.map((l, i) => (
              <div key={i} className={styles.row}>
                {l.cmd && <div className={styles.cmd}>$ {l.cmd}</div>}
                <div className={l.sys ? styles.sys : styles.out}>{l.out}</div>
              </div>
            ))}
          </div>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              exec(input);
              setInput('');
            }}
          >
            <span className={styles.ps1}>➜ ~</span>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type help, whoami, hack..."
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="blink">▊</span>
          </form>
          <div className={styles.hints}>
            {['help', 'whoami', 'arsenal', 'ops', 'hack', 'timejump', 'contact'].map((h) => (
              <button key={h} type="button" className={styles.hint} onClick={() => exec(h)}>
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITerminal;
