import { useEffect } from "react";
import { useUserStore } from "../../hooks/stores/useUserStore";
import { getApiAuthTokenIntrospect } from "../../api/client";

interface AuthentificationProviderProps {
    children : React.ReactNode;
}

export default function AuthentificationProvider({children} : AuthentificationProviderProps) {
    const user = useUserStore();
    // https://stackoverflow.com/questions/69187018/how-can-i-refresh-jwt-token-every-t-minutes
    // https://www.freecodecamp.org/news/how-to-use-settimeout-in-react-using-hooks/#how-to-use-settimeout-in-functional-components
    // https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

    async function UpdateJwtAndUser(){
        // if cookie throws then we stop.
        // Do not use hooks for refresh token.
        // const cl = new Client('http://localhost:3001');
        // const response = await cl.token('refresh_token');
        let success : boolean = true;
        try {
            await fetch('http://localhost:3001/api/auth/token?grantType=refresh_token', {
                method: 'POST',
                credentials : "include",
                mode: 'no-cors'
                });

        } catch (error) {
            user.deleteUser();
            success = false;
            console.error(error);
        }

        if (!success){
            return;
        }

        const me = await getApiAuthTokenIntrospect();
        user.updateUser({
            email: me.email,
            id: me.sub,
            is_confirmed: me.is_confirmed ?? false,
            role: me.role
        });
    }

    useEffect(
        () => {
            console.log('First user retrieval');
            UpdateJwtAndUser();
            const authentificationJob = setInterval(
                async () => {
                    console.log('another user retrieval');
                    UpdateJwtAndUser();
                }
                , 60000);

            return () => clearInterval(authentificationJob);
            // https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    );

    return (
        <>
            {children}
        </>
    );
}
