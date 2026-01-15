import { io } from 'socket.io-client';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    
    const isProd = config.public.env == 'prod'

    console.log(isProd)

    const getSocketOptions = (port) => {
        const options = {
            autoConnect: false,
            transports: ['websocket'],
        };

        if (isProd) {
            options.path = port == 9001 ? '/socket.io/' : `/ws/${port}/socket.io/`;
        }

        return options;
    };

    const getUrl = (port) => {
        return isProd ? config.public.baseIp : `${config.public.baseIp}:${port}`;
    };

    let socket = io(getUrl(config.public.basePort), getSocketOptions(config.public.basePort));
    socket.connect();



    let connectTo = (port) => {
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        socket = io(getUrl(port), getSocketOptions(port));
        socket.connect();
    };

    let setInstance = (v) => {
        socket = v
    }

    return {
        provide: {
            getInstance: () => socket,
            connectTo: connectTo,
            setInstance: setInstance
        }
    };
});