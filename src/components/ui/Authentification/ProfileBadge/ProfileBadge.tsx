import { Avatar, Button, Group, Menu, Text } from "@mantine/core";
import { useUserStore } from "../../../../hooks/stores/useUserStore"
import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSignOutQuery } from "../../../../hooks/queries/useSignOutQuery";
import { IoIosSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfileBadge() {
    const user = useUserStore();
    const {refetch, isLoading} = useSignOutQuery();
    return (
        <>
            {
                user.is_authentificated ? 
                <Menu>
                    <Menu.Target>
                        <Button variant="transparent" leftSection={<Avatar alt="Я"/>}>
                            <Group className="hidden md:flex">
                                {user.is_confirmed && <FaExclamation className="text-red-500"/>}
                                <div>
                                    {user.username ? 
                                        <Text fz="sm" fw="bold">{user.username}</Text> 
                                        :
                                        <Text className="text-left">Без имени</Text>
                                    }
                                    <Text fz="xs" c="dimmed" className="text-left">{user.email}</Text>
                                    
                                </div>
                            </Group>
                        </Button>
                    </Menu.Target>
                    
                    <Menu.Dropdown>
                        <Menu.Item 
                            leftSection={<IoIosSettings/>} 
                            component="a" 
                            href="/app/settings">
                            Настройки
                        </Menu.Item>
                        <Menu.Item 
                            leftSection={<FaSignOutAlt />} 
                            component="button" 
                            disabled={isLoading}
                            onClick={() => {
                                    user.deleteUser();
                                    refetch();
                                }
                            }>
                            Выйти
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                 : 
                <Link to="/signin">Войти</Link>
            }
        </>
    );
}
