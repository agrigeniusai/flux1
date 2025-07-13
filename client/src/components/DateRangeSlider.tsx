import { format, subDays } from 'date-fns';

interface Props {
  start: string;
  end: string;
  onChange: (start: string, end: string) => void;
}

export default function DateRangeSlider({ start, end, onChange }: Props) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const presets = [
    { label: '24 h', start: format(subDays(new Date(), 1), 'yyyy-MM-dd'), end: today },
    { label: '7 d', start: format(subDays(new Date(), 7), 'yyyy-MM-dd'), end: today },
    { label: '30 d', start: format(subDays(new Date(), 30), 'yyyy-MM-dd'), end: today },
    { label: '5 y', start: format(subDays(new Date(), 365 * 5), 'yyyy-MM-dd'), end: today }
  ];

  return (
    <div>
      <label className="block mb-1 text-sm">Date range</label>
      <div className="flex gap-2 text-xs">
        {presets.map((p) => (
          <button
            key={p.label}
            className="bg-slate-700 px-2 py-1 rounded hover:bg-brand-900"
            onClick={() => onChange(p.start, p.end)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <input type="date" value={start} onChange={(e) => onChange(e.target.value, end)} />
        <span>-</span>
        <input type="date" value={end} onChange={(e) => onChange(start, e.target.value)} />
      </div>
    </div>
  );
} 