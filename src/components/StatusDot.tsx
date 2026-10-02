import type { DeployStatus } from '../data'
import { cn } from '@/lib/utils'

const labels: Record<DeployStatus, string> = {
  ready: 'Ready',
  building: 'Building',
  error: 'Error',
}

const dotColors: Record<DeployStatus, string> = {
  ready: 'bg-success',
  building: 'bg-warning animate-pulse',
  error: 'bg-destructive',
}

export function StatusDot({ status, withLabel = false }: { status: DeployStatus; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" title={labels[status]}>
      <span className={cn('inline-block size-2 rounded-full', dotColors[status])} aria-hidden="true" />
      {withLabel ? labels[status] : <span className="sr-only">{labels[status]}</span>}
    </span>
  )
}
