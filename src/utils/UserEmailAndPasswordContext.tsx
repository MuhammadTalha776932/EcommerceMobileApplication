import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";

interface IUserEmailAndPassword {
    contextEmail: string;
    contextPassword: string;
    setContextEmail: React.Dispatch<React.SetStateAction<string>> | null,
    setContextPassword: React.Dispatch<React.SetStateAction<string>> | null,
}

interface IUserEmailAndPasswordContextProvider {
    children: React.ReactNode
}
const initialState: IUserEmailAndPassword = {
    contextEmail: "",
    contextPassword: "",
    setContextEmail: null,
    setContextPassword: null
}

export const UserEmailAndPasswordContext = React.createContext<IUserEmailAndPassword>(initialState);

export const UserEmailAndPasswordContextProvider = ({ children }: IUserEmailAndPasswordContextProvider) => {
    const [email, setContextEmail] = React.useState<string | "">("");
    const [password, setContextPassword] = React.useState<string | "">("");




    return (
        <UserEmailAndPasswordContext.Provider value={{ contextEmail: email, contextPassword: password, setContextEmail, setContextPassword }}>
            {
                children
            }
        </UserEmailAndPasswordContext.Provider>
    )
}