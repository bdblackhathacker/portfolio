import { useEffect, useState } from 'react';

export const Typewriter = ({
  words,
  speed = 70,
  pause = 1600,
}: {
  words: string[];
  speed?: number;
  pause?: number;
}) => {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wi % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!del && text === word) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && text === '') {
      setDel(false);
      setWi((v) => (v + 1) % words.length);
    } else {
      t = setTimeout(
        () => {
          setText(word.slice(0, text.length + (del ? -1 : 1)));
        },
        del ? speed / 2 : speed,
      );
    }
    return () => clearTimeout(t);
  }, [text, wi, del, words, speed, pause]);

  return (
    <span>
      {text}
      <span className="blink">_</span>
    </span>
  );
};

export default Typewriter;
