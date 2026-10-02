import { Bell, ChevronsUpDown, Search } from 'lucide-react'
import { VercelLogo } from './Icons'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Theme } from '../hooks/useTheme'
import { tabs, type Tab } from '../data'

interface Props {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

const gradientAvatar = 'bg-[linear-gradient(135deg,#0070f3,#7928ca_55%,#ff0080)]'

export function Header({ activeTab, onTabChange, theme, onThemeChange }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b bg-card">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2 sm:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center" aria-label="Home">
            <VercelLogo size={20} />
          </a>
          <span className="mx-0.5 scale-y-[1.4] text-[22px] font-extralight text-border-strong" aria-hidden="true">
            /
          </span>
          <Button variant="ghost" className="gap-2 px-2 font-medium">
            <Avatar className="size-5" aria-hidden="true">
              <AvatarFallback className={gradientAvatar} />
            </Avatar>
            Nomi’s projects
            <Badge variant="secondary">Hobby</Badge>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden text-muted-foreground hover:text-foreground sm:inline-flex">
            Feedback
          </Button>
          <label className="relative hidden w-44 items-center sm:flex">
            <Search className="pointer-events-none absolute left-2.5 size-3.5 text-subtle-foreground" />
            <Input
              type="search"
              placeholder="Find…"
              aria-label="Find"
              className="h-8 bg-muted pr-9 pl-8 shadow-none"
            />
            <Kbd className="absolute right-2 bg-card shadow-[inset_0_0_0_1px_var(--border)]">F</Kbd>
          </label>
          <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Notifications">
            <Bell />
          </Button>
          <ThemeSwitcher theme={theme} onChange={onThemeChange} />
          <Avatar className="ml-1 size-7" aria-label="Account">
            <AvatarFallback className={gradientAvatar} />
          </Avatar>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as Tab)}>
        <TabsList
          variant="line"
          aria-label="Primary"
          className="h-auto w-full justify-start gap-1 overflow-x-auto p-0 px-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="h-auto flex-none px-3 pt-2 pb-3 after:inset-x-2 data-[state=active]:text-foreground dark:data-[state=active]:text-foreground"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </header>
  )
}
