interface IStackScreenNameProvider {
    [K: PropertyKey]: string;
}

export const StackScreenNameProvider = {
    SignIn: "SignIn",
    SignUp: "SignUp",
    Auth: "Auth",
    Home: "Home",
}