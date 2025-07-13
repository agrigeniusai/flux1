import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';
import axios from 'axios';
import { Point } from '../App';

const fetcher = (url: string) => axios.get(url).then((r) => r.data);

interface Props {
  point: Point;
  start: string;
  end: string;
  showAnomaly: boolean;
}

export default function FluxChart({ point, start, end, showAnomaly }: Props) {
  const { data } = useSWR(
    `/api/flux/history?lat=${point.lat}&lon=${point.lon}&start=${start}&end=${end}`,
    fetcher
  );

  if (!data) return <p className="text-sm text-slate-400">Loading history…</p>;

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.results}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} domain={['dataMin - 1', 'dataMax + 1']} />
          <Tooltip />
          <Line type="monotone" dataKey="flux" stroke="#00e400" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 