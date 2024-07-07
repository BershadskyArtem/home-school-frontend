import { notifications } from "@mantine/notifications";

export async function WithNotificationOnFail<T>(fn : () => Promise<T>) : Promise<T> {
    try {
        const result = await fn();
        return result;    
    } catch (error) {
        //console.error(error);
        console.log("Notification Action");
        
        notifications.show({
            title: "Что-то пошло не так, попробуйте чуть позже",
            message: JSON.stringify(error),
            color: "red"
        });
        throw error;
    }
}