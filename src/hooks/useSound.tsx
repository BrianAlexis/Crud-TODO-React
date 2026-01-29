export const useSound = (url: string) => {
    const audio = new Audio(url);

    const play = () => {
        audio.currentTime = 0;
        audio.play().catch(() => { }); // El catch evita errores si el navegador bloquea el audio
        audio.volume = 0.3;
    };

    return play;
};