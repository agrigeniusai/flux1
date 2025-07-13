import { useState } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';

export type Point = { lat: number; lon: number };

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100">
      <Sidebar
        selectedPoint={selectedPoint}
        onPointChange={setSelectedPoint}
      />
      <MapView selectedPoint={selectedPoint} onPointChange={setSelectedPoint} />
    </div>
  );
} 