import { AppShell } from "@mantine/core";
import DashboardHeader from "../components/layouts/headers/Dashboard/DashboardHeader";

export default function DashboardPage() {
    return (
        <>
            <AppShell>
                <AppShell.Header>
                    <DashboardHeader/>
                </AppShell.Header>
            </AppShell>
        </>
    )
}
