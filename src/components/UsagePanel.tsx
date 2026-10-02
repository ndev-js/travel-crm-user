import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { usage, type UsageItem } from '../data'

function Ring({ percent }: { percent: number }) {
  const r = 7
  const c = 2 * Math.PI * r
  const color = percent >= 90 ? 'var(--destructive)' : percent >= 70 ? 'var(--warning)' : 'var(--info)'
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="2" />
      <circle
        cx="9"
        cy="9"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - Math.min(percent, 100) / 100)}
        transform="rotate(-90 9 9)"
      />
    </svg>
  )
}

function Row({ item }: { item: UsageItem }) {
  const percent = (item.used / item.limit) * 100
  return (
    <li className="flex items-center gap-2.5 text-[13px]">
      <Ring percent={percent} />
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      <span className="font-mono text-xs text-muted-foreground">
        {item.used} / {item.limit} {item.unit}
      </span>
    </li>
  )
}

export function UsagePanel() {
  return (
    <Card aria-labelledby="usage-title" role="region">
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 id="usage-title" className="text-sm font-semibold">
          Usage
        </h2>
        <Badge variant="secondary">Last 30 days</Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {usage.map((item) => (
            <Row key={item.label} item={item} />
          ))}
        </ul>
        <Button variant="outline" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  )
}

export function AlertsPanel() {
  return (
    <Card aria-labelledby="alerts-title" role="region">
      <CardHeader>
        <h2 id="alerts-title" className="text-sm font-semibold">
          Alerts
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-muted-foreground">Get alerted for anomalies in your usage and errors in your projects.</p>
        <Button variant="outline" className="w-full">
          Subscribe to Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
