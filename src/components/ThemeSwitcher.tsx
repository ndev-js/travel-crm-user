import { Monitor, Moon, Sun } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Theme } from '../hooks/useTheme'

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
  { value: 'dark', label: 'Dark', icon: Moon },
]

interface Props {
  theme: Theme
  onChange: (theme: Theme) => void
}

export function ThemeSwitcher({ theme, onChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={theme}
      // Radix emits '' when the active item is clicked again; keep the current theme
      onValueChange={(value) => value && onChange(value as Theme)}
      aria-label="Theme"
      className="gap-0 rounded-lg p-0.5 shadow-[inset_0_0_0_1px_var(--border)]"
    >
      {options.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="size-7 min-w-7 px-0 text-subtle-foreground hover:bg-transparent hover:text-foreground data-[spacing=0]:rounded-md data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:shadow-[inset_0_0_0_1px_var(--border)]"
        >
          <Icon className="size-3.5" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
