// app/settings/advanced/components/AdvancedSettingToggle.tsx

import { Switch } from "@/components/ui/switch";

export function AdvancedSettingToggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b">
      <div>
        <p className="font-medium">{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
