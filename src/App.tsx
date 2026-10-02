import { useMemo, useState } from 'react'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import { Header } from './components/Header'
import { ProjectCard } from './components/ProjectCard'
import { AlertsPanel, UsagePanel } from './components/UsagePanel'
import { DeploymentsTable } from './components/DeploymentsTable'
import { StatusDot } from './components/StatusDot'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useTheme } from './hooks/useTheme'
import { projects, type Tab } from './data'

type View = 'grid' | 'list'

function Overview() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('grid')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? projects.filter((p) => p.name.toLowerCase().includes(q) || p.repo.toLowerCase().includes(q))
      : projects
  }, [query])

  return (
    <div className="grid grid-cols-1 items-start gap-6 min-[901px]:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="order-2 flex flex-col gap-4 min-[901px]:order-none">
        <UsagePanel />
        <AlertsPanel />
      </aside>

      <section className="min-w-0" aria-labelledby="projects-title">
        <h2 id="projects-title" className="sr-only">
          Projects
        </h2>
        <div className="mb-6 flex items-center gap-2">
          <label className="relative flex min-w-0 flex-1 items-center">
            <Search className="pointer-events-none absolute left-2.5 size-4 text-subtle-foreground" />
            <Input
              type="search"
              placeholder="Search Repositories and Projects…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 bg-card pl-8 shadow-none"
            />
          </label>
          <ToggleGroup
            type="single"
            value={view}
            // Radix emits '' when the active item is clicked again; keep the current view
            onValueChange={(value) => value && setView(value as View)}
            aria-label="Layout"
            className="gap-0 rounded-lg p-0.5 shadow-[inset_0_0_0_1px_var(--border)]"
          >
            {(
              [
                { value: 'grid', label: 'Grid view', icon: LayoutGrid },
                { value: 'list', label: 'List view', icon: List },
              ] as const
            ).map(({ value, label, icon: Icon }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                aria-label={label}
                className="size-7 min-w-7 px-0 text-subtle-foreground hover:bg-transparent hover:text-foreground data-[spacing=0]:rounded-md data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:shadow-[inset_0_0_0_1px_var(--border)]"
              >
                <Icon className="size-3.5" />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button>
            Add New…
            <Plus />
          </Button>
        </div>

        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Projects</h3>

        {filtered.length === 0 ? (
          <Card className="px-4 py-12 text-center">
            <p>No projects match “{query}”.</p>
          </Card>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <Card className="gap-0 py-0">
            <ul className="m-0 list-none p-0">
              {filtered.map((p) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto_24px] items-center gap-4 border-t px-4 py-3 first:border-t-0 hover:bg-hover sm:grid-cols-[minmax(0,2fr)_1fr_1fr_80px_24px]"
                >
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.domain}</div>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:inline">{p.framework}</span>
                  <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{p.branch}</span>
                  <span className="text-xs text-muted-foreground">{p.updated}</span>
                  <StatusDot status={p.status} />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>
    </div>
  )
}

function Placeholder({ tab }: { tab: Tab }) {
  return (
    <Card className="px-4 py-12 text-center">
      <h3 className="mb-1 font-semibold">{tab}</h3>
      <p className="text-muted-foreground">This section isn’t built yet.</p>
    </Card>
  )
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [tab, setTab] = useState<Tab>('Overview')

  return (
    <>
      <Header activeTab={tab} onTabChange={setTab} theme={theme} onThemeChange={setTheme} />
      <main className="mx-auto max-w-[1200px] px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-16">
        {tab === 'Overview' ? (
          <Overview />
        ) : tab === 'Deployments' ? (
          <DeploymentsTable />
        ) : (
          <Placeholder tab={tab} />
        )}
      </main>
    </>
  )
}
