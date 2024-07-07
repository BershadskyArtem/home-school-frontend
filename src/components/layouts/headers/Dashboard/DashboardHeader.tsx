import { Breadcrumbs, Button, Combobox, Group, useCombobox } from "@mantine/core";
import { FaBookOpen } from "react-icons/fa";
import ProfileBadge from "../../../ui/Authentification/ProfileBadge/ProfileBadge";
import { Link } from "react-router-dom";
import { useUserStore } from "../../../../hooks/stores/useUserStore";
import { useSettingsStore } from "../../../../hooks/stores/useSettingsStore";

// interface DashboardHeaderProps {
//     children : React.ReactNode;
// }

export default function DashboardHeader() {
    const role = useUserStore(state => state.role);
    const roleModel = useSettingsStore(state => state.role_model);
    const combobox = useCombobox();

    return (
        <div className="flex justify-between px-2 py-1 shadow-sm lg:px-12 lg:py-2">
            <Group>
                <Link to="/app">
                    <FaBookOpen className="sm:inline hidden"/>
                    <span className="m-1">Безымянный проект</span>
                </Link>

                <Breadcrumbs>
                    <Button 
                        variant="subtle"
                        component="a"
                        href="/app/settings"
                    >
                        {role}
                    </Button>
                   
                    <Combobox store={combobox}>
                        <Combobox.Target>
                            <Button 
                                onClick={() => combobox.toggleDropdown()}
                                rightSection={<Combobox.Chevron/>}
                                variant="subtle">
                                {
                                    roleModel === 'student' ? 'Студент' : 'Учитель'
                                }
                            </Button>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options>
                                <Combobox.Option value={roleModel === 'student' ? "teacher" : "student"}>
                                {
                                    roleModel === 'student' ? 
                                    'Учитель' : 'Ученик'
                                }
                                </Combobox.Option>
                            </Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                </Breadcrumbs>


            </Group>            
            <Group>
                <ProfileBadge/>
            </Group>
        </div>
    );
}
