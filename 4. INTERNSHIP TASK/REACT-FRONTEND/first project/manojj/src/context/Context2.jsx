import { createContext, useContext, useState } from "react";

export const Context2 = createContext();

export const ContextProvider = ({ children }) => {
    const [add, setAdd] = useState("");
    const [remote, setRemote] = useState("");
        const [active, setActive] = useState();

    const handleAdd = () => {setAdd("Add");
        setActive("add")
    }
    const handleRemote = () => {setRemote("Remote");
        setActive("Remote ")
    }

    return (
        <Context2.Provider value={{ active ,add, remote, handleAdd, handleRemote }}>
            {children}
        </Context2.Provider>
    );
};

export const useContext2 = () => useContext(Context2);
