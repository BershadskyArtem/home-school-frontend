import { Button, Divider, Paper, Stack, TextInput, Title } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { postApiAuthMagic } from "../../../../api/client";
import { notifications } from "@mantine/notifications";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SiZoom } from "react-icons/si";
import { oauthGithubLink, oauthGoogleLink, oauthZoomLink } from "./SignInForm.Misc";
import { WithNotificationOnFail } from "../../../../lib/common/WithNotificationOnFailAction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const magicSchema = z.object({
    email : z.string().email()
});

type MagicLinkRequest = z.infer<typeof magicSchema>;

export default function SignInForm() {

    const { register, handleSubmit, formState : {isSubmitting, isValid, errors} } = useForm<MagicLinkRequest>({
        defaultValues : {
            email : ""
        },
        resolver: zodResolver(magicSchema)
    });

    const magicSubmitHandler : SubmitHandler<MagicLinkRequest> = async (data : MagicLinkRequest) => {
            const result = await WithNotificationOnFail(() => {
                return postApiAuthMagic({
                    requestBody : {
                        email: data.email
                    }
                });
            })

            if (result.isSuccess){
                notifications.show({
                    title : `На адрес ${data.email} оптравлено письмо`,
                    message : "Проверьте пожалуйста свою почту"
                });
            }
    }

    return (
        <Paper shadow="sm" p="sm" radius="md" className="min-w-80" withBorder>
            <Stack gap="">
                <Title className="text-2xl text-center">
                    Добро пожаловать
                </Title>

                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(magicSubmitHandler)}>
                    <TextInput
                        required
                        {...register("email")}
                        type="email"
                        label="Email"
                        description="Введите email для входа"
                        placeholder="example@gmail.com"
                        error={errors.email?.message}
                    />

                    <Button type="submit" fullWidth disabled={isSubmitting || !isValid}>Войти</Button>
                </form>
            
                <Divider
                    size="sm"
                    my="xs"
                    label="Или войдите с помощью"
                    labelPosition="center"
                />

                <Button
                    component="a"
                    href={oauthGoogleLink()}
                    leftSection={<FaGoogle/>}
                >Google</Button>

                <Button
                    component="a"
                    href={oauthGithubLink()}
                    color="rgba(69, 69, 69, 1)"
                    leftSection={<FaGithub/>}
                >Github</Button>

                <Button
                    component="a"
                    color="orange"
                    href={oauthZoomLink()}
                    leftSection={<SiZoom size={20} />}
                >Zoom (пока не работает)</Button>
            </Stack>
        </Paper>
    )
}
