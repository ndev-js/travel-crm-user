import { GitBranch } from 'lucide-react'
import { StatusDot } from './StatusDot'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deployments } from '../data'

export function DeploymentsTable() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Deployment</TableHead>
            <TableHead>Environment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Source</TableHead>
            <TableHead className="text-right">Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deployments.map((d) => (
            <TableRow key={d.id}>
              <TableCell>
                <div className="font-medium">{d.project}</div>
                <div className="font-mono text-xs text-muted-foreground">{d.url}</div>
              </TableCell>
              <TableCell>
                <Badge variant={d.environment === 'Production' ? 'info' : 'secondary'}>{d.environment}</Badge>
              </TableCell>
              <TableCell>
                <StatusDot status={d.status} withLabel />
                <div className="text-xs text-muted-foreground">{d.duration}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center gap-1.5">
                  <GitBranch className="size-3" />
                  <span className="font-mono text-[0.92em]">{d.branch}</span>
                </div>
                <div className="text-xs text-muted-foreground">{d.commit}</div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {d.age} by {d.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
