import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../hooks/stores/useUserStore";
import { getApiAuthTokenIntrospect } from "../api/client";

export default function MagicPage() {
    const user = useUserStore();
    const [queryParams] = useSearchParams();
    const code = queryParams.get("code");

    useEffect(() => {
        // https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0
        async function DoMagic() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/magic?code=${code}`, {
                    method: "GET",
                    credentials: "include"
                });    
                
                if (response.status !== 200){
                    throw new Error("Не получилось воспользоваться вашей ссылкой, пожалуйста попробуйте еще раз.");
                }

                const me = await getApiAuthTokenIntrospect();

                if (user.email !== me.email || 
                    user.id !== me.sub ||
                    user.role !== me.role ||
                    user.is_confirmed !== me.is_confirmed)
                {
                    user.updateUser({
                        email: me.email,
                        id: me.sub,
                        is_confirmed: me.is_confirmed ?? false,
                        role: me.role,
                        is_authentificated : true
                    });
                }

            } catch (error) {
                const err = error as Error; 
                notifications.show({
                    title: "Что-то пошло не так... Попробуйте позже",
                    message: err.message,
                    color: 'red'
                });
            }
        }


        DoMagic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            Эта страница с магией, спасибо что пришли к нам.
        </div>
    );
}
