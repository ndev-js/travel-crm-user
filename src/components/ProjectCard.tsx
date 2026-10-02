import { GitBranch, MoreHorizontal } from 'lucide-react'
import { GithubIcon, VercelLogo } from './Icons'
import { StatusDot } from './StatusDot'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Project } from '../data'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card role="article" className="p-4 transition-shadow hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        <span
          className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
          aria-hidden="true"
        >
          <VercelLogo size={14} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-sm font-semibold">{project.name}</h3>
          <a
            href={`https://${project.domain}`}
            className="truncate text-[13px] text-muted-foreground hover:text-foreground hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {project.domain}
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label={`${project.name} options`}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-menu">
            <DropdownMenuItem asChild>
              <a href={`https://${project.domain}`} target="_blank" rel="noreferrer">
                Visit
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Badge variant="secondary" className="h-7 gap-1.5 self-start px-2.5 text-[13px] font-normal text-foreground">
        <GithubIcon size={14} />
        {project.repo}
      </Badge>

      <div>
        <p className="truncate text-sm" title={project.commit}>
          {project.commit}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground">
          <span>{project.updated}</span>
          <span aria-hidden="true">on</span>
          <GitBranch className="size-3" />
          <span className="font-mono text-[0.92em]">{project.branch}</span>
          <span className="flex-1" />
          <StatusDot status={project.status} />
        </p>
      </div>
    </Card>
  )
}
