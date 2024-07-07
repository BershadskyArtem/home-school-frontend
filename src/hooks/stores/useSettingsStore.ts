import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface ISettings {
    consent : boolean;
    did_show_consent_modal : boolean;
    role_model : string;
}

export interface ISettingsMutator {
    setConsent : (newValue : boolean) => void;
    setTeacher : () => void;
    setStudent : () => void;
}

export const useSettingsStore = create(
    persist<ISettings & ISettingsMutator>(
        (set) => ({
            consent : false,
            did_show_consent_modal : false,
            role_model : "none",
            setConsent : (newValue) => set(previousState => ({
                ...previousState,
                consent : newValue
            })),
            setStudent : () => set(previousState => ({...previousState, role_model: "student"})),
            setTeacher : () => set(previousState => ({...previousState, role_model: "teacher"})),
        }),
        {
            name: "user_settings",
            storage : createJSONStorage(() => sessionStorage)
        }
    )
)