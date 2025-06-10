// app/settings/advanced/components/AdvancedSettingNumber.tsx

export function AdvancedSettingNumber({
    label,
    description,
    value,
    onChange,
  }: {
    label: string;
    description?: string;
    value: number;
    onChange: (val: number) => void;
  }) {
    return (
      <div className="py-3 border-b">
        <label className="block font-medium">{label}</label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        <input
          type="number"
          className="mt-1 w-full p-2 border rounded-md"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        />
      </div>
    );
  }
  