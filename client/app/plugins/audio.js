import Sound from '../audio/Sound'

export default defineNuxtPlugin(() => {

    if (!import.meta.client) {
        return {
            provide: {
                audio: null
            }
        };
    }

    return {
        provide: {
            audio: new Sound()
        }
    };
});