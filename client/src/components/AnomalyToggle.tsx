interface Props {
  enabled: boolean;
  onToggle: (v: boolean) => void;
}

export default function AnomalyToggle({ enabled, onToggle }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
      Highlight anomalies
    </label>
  );
} 