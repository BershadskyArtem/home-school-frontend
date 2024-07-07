import { Button, Container } from '@mantine/core';
import { useUserStore } from '../../../hooks/stores/useUserStore';
import { getApiAuthLogout, GetApiAuthLogoutResponse } from '../../../api/client';
import { useQuery } from 'react-query';
import SignInForm from '../Authentification/SignIn/SignInForm';
import DashboardHeader from '../../layouts/headers/Dashboard/DashboardHeader';

export default function DebugUserInfo() {
    const user = useUserStore();
    const { isLoading: isSignoutLoading , refetch: signOut } = useQuery<GetApiAuthLogoutResponse>(
        {
            queryFn : async () => {
                return getApiAuthLogout({
                    tokenType: "Bearer"
                });
            },
            // https://tanstack.com/query/v4/docs/framework/react/guides/disabling-queries
            enabled : false
        }
    );
    return (
        <>
            <DashboardHeader/>
            <div className="border-1 p-4 rounded-md shadow-lg text-left max-w-lg">
            <div className='font-bold'>
                Информация о тебе:
            </div>
            

            <div className='flex flex-col gap-2 mt-2'>
                {
                    user.is_confirmed ?  
                    <>
                        <div>Email: {user.email}</div>
                        <div>Роль(админ, суперадмин и т.п.): {user.role}</div>
                        <div>Id: {user.id}</div>
                    </> :
                    "Я хз кто ты, попробуй зарегаться что-ли..."
                }
                </div>

                {   user.is_confirmed ?
                    <Button fullWidth disabled={isSignoutLoading} onClick={async () => {
                        await signOut();
                        user.deleteUser();
                    }}>Выйти</Button>
                    
                    :
                    <Container>
                        <SignInForm/>
                    </Container>
                }

            </div>
        </>
    )
}
