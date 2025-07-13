import { useState } from 'react';
import { Point } from '../App';
import LocationSearch from './LocationSearch';
import DateRangeSlider from './DateRangeSlider';
import AnomalyToggle from './AnomalyToggle';
import ExportReportButton from './ExportReportButton';
import FluxChart from './FluxChart';
import { format } from 'date-fns';

interface Props {
  selectedPoint: Point | null;
  onPointChange: (p: Point) => void;
}

export default function Sidebar({ selectedPoint, onPointChange }: Props) {
  const [start, setStart] = useState(() => format(new Date(Date.now() - 864e5), 'yyyy-MM-dd'));
  const [end, setEnd] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showAnomaly, setShowAnomaly] = useState(false);

  return (
    <aside className="w-full md:w-96 bg-slate-800 p-4 flex flex-col gap-4 overflow-y-auto">
      <h1 className="text-2xl font-bold text-brand-50">Carbon Flux</h1>

      <LocationSearch onSelect={onPointChange} />

      {selectedPoint && (
        <>
          <div className="text-sm">
            <p>Selected:</p>
            <p>
              {selectedPoint.lat.toFixed(4)}, {selectedPoint.lon.toFixed(4)}
            </p>
          </div>

          <DateRangeSlider start={start} end={end} onChange={(s, e) => { setStart(s); setEnd(e); }} />

          <AnomalyToggle enabled={showAnomaly} onToggle={setShowAnomaly} />

          <FluxChart point={selectedPoint} start={start} end={end} showAnomaly={showAnomaly} />

          <ExportReportButton point={selectedPoint} start={start} end={end} />
        </>
      )}
    </aside>
  );
} 