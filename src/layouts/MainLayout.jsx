import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function MainLayout() {
    return (
        <div className="flex min-h-screen w-full min-w-0 flex-col bg-[#fcfbf9] text-zinc-900">
            <Header />

            <main className="w-full min-w-0 flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;