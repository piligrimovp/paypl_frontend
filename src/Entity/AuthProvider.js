import {useEffect, useState} from "react";

export const createTokenProvider = () => {
    let _token: { accessToken: string, refreshToken: string } =
        JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || 'null') || null;

    let _user: { user: {} } =
        JSON.parse(localStorage.getItem('REACT_USER_AUTH') || 'null') || null;

    const getExpirationDate = (jwtToken?: string): number | null => {
        if (!jwtToken) {
            return null;
        }

        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

        // multiply by 1000 to convert seconds into milliseconds
        return (jwt && jwt.exp && jwt.exp * 1000) || null;
    };

    const isExpired = (exp?: number) => {
        if (!exp) {
            return false;
        }

        return Date.now() > exp;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }

        if (isExpired(getExpirationDate(_token))) {
            const updatedToken = await fetch(window.HOST + '/profile/updateToken', {
                method: 'POST',
                body: _token
            })
                .then(r => r.json());

            setToken(updatedToken);
        }

        return _token;// && _token.accessToken;
    };

    const isLoggedIn = () => {
        return !!_token;
    };

    let observers: Array<(isLogged: boolean) => void> = [];

    const subscribe = (observer: (isLogged: boolean) => void) => {
        observers.push(observer);
    };

    const unsubscribe = (observer: (isLogged: boolean) => void) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const setToken = (token: typeof _token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        } else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
            localStorage.removeItem('REACT_USER_AUTH');
        }
        _token = token;
        notify();
    };

    const setUser = (user) => {
        localStorage.setItem('REACT_USER_AUTH', JSON.stringify(user));
    }

    const getUser = () => {
        return _user;
    }

    return {
        getToken,
        isLoggedIn,
        setToken,
        setUser,
        getUser,
        subscribe,
        unsubscribe,
    };
};

export const createAuthProvider = () => {

    const tokenProvider = createTokenProvider();

    const login: typeof tokenProvider.setToken = (newTokens) => {
        tokenProvider.setToken(newTokens.token);
        tokenProvider.setUser(newTokens.user)
        window.location.reload();
    };

    const logout = () => {
        tokenProvider.setToken(null);
        window.location.reload();
    };

    const authFetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        const token = await tokenProvider.getToken();

        init = init || {};

        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        };

        return fetch(input, init);
    };

    const useAuth = () => {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        useEffect(() => {
            const listener = (newIsLogged: boolean) => {
                setIsLogged(newIsLogged);
            };

            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);

        return isLogged;
    };

    const getUser = () => {
        return tokenProvider.getUser();
    }

    const getUserDetail = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        authFetch(window.HOST + "/profile/detail", {
            method: 'POST',
            mode: "cors",
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(e => {
                return [];
            });
    }

    const updateUser = (name: string, value: string) => {

    }

    return {
        useAuth,
        authFetch,
        login,
        logout,
        getUser,
        updateUser,
        getUserDetail,
    }
};