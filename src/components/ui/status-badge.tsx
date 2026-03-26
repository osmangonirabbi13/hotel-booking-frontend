interface StatusBadgeProps {
  active: boolean;
}

export default function StatusBadge({ active }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded px-2 py-1 text-xs font-medium ${
        active
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-600"
      }`}
    >
      {active ? "ENABLE" : "DISABLE"}
    </span>
  );
}