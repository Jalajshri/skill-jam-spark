import { 
  Home, 
  Search, 
  Library, 
  Plus, 
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayer, sampleTracks, Track } from "@/contexts/PlayerContext";

const mainNavItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Explore", url: "/explore", icon: Search },
  { title: "My Library", url: "/library", icon: Library },
];

const learningPaths = [
  { title: "Daily Practice", emoji: "🎯", color: "bg-primary/20" },
  { title: "Vocabulary Boost", emoji: "📚", color: "bg-warning/20" },
  { title: "Grammar Essentials", emoji: "✏️", color: "bg-blue-500/20" },
  { title: "Listening Skills", emoji: "🎧", color: "bg-purple-500/20" },
  { title: "Speaking Practice", emoji: "🗣️", color: "bg-pink-500/20" },
  { title: "Reading Corner", emoji: "📖", color: "bg-orange-500/20" },
];

const recentActivity: { title: string; subtitle: string; emoji: string; trackId: string }[] = [
  { title: "Spanish Basics", subtitle: "Course • 12 lessons", emoji: "🇪🇸", trackId: "1" },
  { title: "French Verbs", subtitle: "Course • 8 lessons", emoji: "🇫🇷", trackId: "5" },
  { title: "Travel Phrases", subtitle: "Playlist • 24 phrases", emoji: "✈️", trackId: "6" },
  { title: "Business German", subtitle: "Course • 15 lessons", emoji: "🇩🇪", trackId: "7" },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { play, currentTrack, isPlaying } = usePlayer();

  return (
    <Sidebar 
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-200",
        isCollapsed ? "w-[72px]" : "w-[300px]"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight">
              Eternity <span className="text-gradient">music</span>
            </span>
          )}
          <button 
            onClick={toggleSidebar}
            className="w-7 h-7 rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80 flex items-center justify-center transition-colors hover:scale-105"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <ScrollArea className="h-[calc(100vh-230px)]">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink 
                        to={item.url} 
                        end 
                        className="flex items-center gap-4 px-3 rounded-lg hover:bg-secondary transition-colors"
                        activeClassName="bg-secondary text-primary font-semibold"
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Divider */}
          <div className="my-4 mx-3 h-px bg-border" />

          {/* Learning Paths */}
          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="flex items-center justify-between px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Learning Paths
                </span>
                <button className="w-6 h-6 rounded-full hover:bg-secondary flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </button>
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {learningPaths.map((path) => (
                  <SidebarMenuItem key={path.title}>
                    <SidebarMenuButton asChild className="h-12">
                      <button className="flex items-center gap-3 px-2 w-full rounded-md hover:bg-sidebar-accent transition-all duration-150 text-left group">
                        <div className={cn(
                          "w-10 h-10 rounded flex items-center justify-center shrink-0 transition-all",
                          path.color,
                          "group-hover:shadow-lg"
                        )}>
                          <span className="text-lg">{path.emoji}</span>
                        </div>
                        {!isCollapsed && (
                          <span className="text-sm font-medium truncate">{path.title}</span>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Divider */}
          {!isCollapsed && <div className="my-4 mx-3 h-px bg-border" />}

          {/* Recent Activity */}
          {!isCollapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Recently Played
                </span>
              </SidebarGroupLabel>
              <SidebarGroupContent>
              <SidebarMenu>
                  {recentActivity.map((item) => {
                    const track = sampleTracks.find(t => t.id === item.trackId);
                    const isCurrentTrack = currentTrack?.id === item.trackId;
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className="h-16">
                          <button 
                            onClick={() => track && play(track)}
                            className={cn(
                              "flex items-center gap-3 px-2 w-full rounded-md hover:bg-sidebar-accent transition-all duration-150 text-left group relative",
                              isCurrentTrack && "bg-sidebar-accent"
                            )}
                          >
                            <div className="w-12 h-12 rounded flex items-center justify-center shrink-0 bg-card relative overflow-hidden group-hover:shadow-lg transition-all">
                              <span className={cn("text-xl transition-opacity", isCurrentTrack && isPlaying ? "opacity-0" : "group-hover:opacity-0")}>{item.emoji}</span>
                              {/* Play button overlay */}
                              <div className={cn(
                                "absolute inset-0 bg-background/60 transition-opacity flex items-center justify-center",
                                isCurrentTrack && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              )}>
                                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                                  <Play className="w-3 h-3 text-primary-foreground fill-current ml-0.5" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium truncate group-hover:text-foreground",
                                isCurrentTrack && "text-primary"
                              )}>{item.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                            </div>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex</p>
              <p className="text-xs text-muted-foreground">Level 8 • 1,250 XP</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              A
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
