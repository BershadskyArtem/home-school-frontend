import { Button, TextInput } from '@mantine/core';
import { useUserStore } from '../../hooks/stores/useUserStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getApiAuthLogout, GetApiAuthLogoutResponse, postApiAuthMagic } from '../../api/client';
import { useQuery } from 'react-query';

interface MagicLinkRequest {
    email : string
}

export default function DebugUserInfo() {
    const user = useUserStore();

    const { register, handleSubmit, formState : { isSubmitting : isMagicSubmiting } } = useForm<MagicLinkRequest>({
        defaultValues : {
            email: ''
        },
    });

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

    const onSubmit : SubmitHandler<MagicLinkRequest> = (data) => {
        console.log(data);
        postApiAuthMagic({
            requestBody : {
                email : data.email
            }
        });
    }

    return (
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

                {   !user.is_confirmed ?
                    <form className='pt-2 flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                            {...register('email')}
                            type='email'
                            label='Email'
                            description='Введите email для входа'
                            placeholder='example@gmail.com'
                        />

                        <Button disabled={isMagicSubmiting} type='submit'>Отправить</Button>
                    </form>
                    :
                    <Button fullWidth disabled={isSignoutLoading} onClick={async () => {
                        await signOut();
                        user.deleteUser();
                    }}>Выйти</Button>

                }
            </div>
        </div>
    )
}
