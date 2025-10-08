import { Header } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/sidebar";


export default function DashboardPage() {
    return (
         <div className="min-h-screen bg-background">
                      <div className="min-h-screen bg-background">
                        <Header />
                        <div className="flex">
                          <aside className="hidden md:block border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <div className="sticky top-16 h-[calc(100vh-4rem)]">
                              <Sidebar />
                            </div>
                          </aside>
                      
                        </div>
                      </div>
              
               </div>
    );
  }
  