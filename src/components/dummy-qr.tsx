// A purely decorative QR-code look-alike. Not scannable — this MVP has no backend
// to encode a real ticket payload into, so the pattern is generated deterministically
// from the ticket id just so each ticket looks slightly different.

const SIZE = 25;

function buildMatrix(seed: string): boolean[][] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const matrix: boolean[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= SIZE - 7) || (r >= SIZE - 7 && c < 7);

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (isFinder(r, c)) continue;
      hash = (hash * 1103515245 + 12345) >>> 0;
      matrix[r][c] = (hash >> 3) % 2 === 0;
    }
  }

  // Stamp finder squares (the three corner markers real QR codes use).
  const stampFinder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const outer = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[r0 + r][c0 + c] = outer || inner;
      }
    }
  };
  stampFinder(0, 0);
  stampFinder(0, SIZE - 7);
  stampFinder(SIZE - 7, 0);

  return matrix;
}

export function DummyQr({ seed, className }: { seed: string; className?: string }) {
  const matrix = buildMatrix(seed);

  return (
    <div
      className={`rounded-xl bg-white p-3 shadow-inner ${className ?? ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${SIZE}, 1fr)`,
        gap: "2px",
      }}
      aria-label="Dummy QR code"
    >
      {matrix.flatMap((row, r) =>
        row.map((on, c) => (
          <span key={`${r}-${c}`} className={on ? "rounded-[1px] bg-[#111827]" : "rounded-[1px] bg-transparent"} />
        )),
      )}
    </div>
  );
}
