import { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { Point } from '../App';

interface Props {
  onSelect: (p: Point) => void;
}

export default function LocationSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    setResults(data.slice(0, 5));
  };

  return (
    <div>
      <label className="block mb-1 text-sm">Search location</label>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded px-2 py-1 text-slate-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="e.g. Tokyo"
        />
        <button onClick={handleSearch} className="p-1 bg-brand-900 rounded">
          <Search size={20} />
        </button>
      </div>
      <ul className="mt-2 text-sm">
        {results.map((r) => (
          <li
            key={r.place_id}
            className="cursor-pointer hover:bg-slate-700 p-1 rounded"
            onClick={() => {
              onSelect({ lat: parseFloat(r.lat), lon: parseFloat(r.lon) });
              setResults([]);
              setQuery(r.display_name);
            }}
          >
            {r.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
} 