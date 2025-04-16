import { createContext, useState } from "react";

export const AuthContext = createContext({
    token: '',
    isAuth: false,
    email: '',
    uid: '',
    wins: 0,
    gamesPlayed: 0,
    auth: (token, email, uid, wins, gamesPlayed) => {},
    logout: () => {},
});

function AuthContextProvider({children}) {

    const [authToken, setAuthToken] = useState("");
    const [email, setEmail] = useState();
    const [uid, setUID] = useState();
    const [wins, setWins] = useState();
    const [gamesPlayed, setGamesPlayed] = useState();

    function auth(token, email, uid, wins, gamesPlayed) {
        setAuthToken(token);
        setEmail(email);
        setUID(uid);
        setWins(wins);
        setGamesPlayed(gamesPlayed);
    }

    function logout() {
        setAuthToken(null);
        setEmail(null);
        setUID(null);
        setWins(0);
        setGamesPlayed(0);
    }

    const value = {
        token: authToken,
        isAuth: !!authToken,
        email: email,
        uid: uid,
        wins: wins,
        gamesPlayed: gamesPlayed,
        auth: auth,
        logout: logout,
    }

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;