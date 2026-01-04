import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NowPlayingBar from "@/components/NowPlayingBar";
import { PlayerProvider } from "@/contexts/PlayerContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <PlayerProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 overflow-auto pb-[90px]">
            {children}
          </main>
          <NowPlayingBar />
        </div>
      </SidebarProvider>
    </PlayerProvider>
  );
};

export default DashboardLayout;
