import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AlbumIntroPlayerProps = {
  src: string;
};

type PlayerState = {
  currentTime: number;
  duration: number;
  isLoaded: boolean;
  isPlaying: boolean;
  hasError: boolean;
};

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  isLoaded: false,
  isPlaying: false,
  hasError: false,
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes.toString().padStart(2, "0")}:${remainder}`;
}

/** Audio source is intentionally assigned only inside the click handler. */
export function AlbumIntroPlayer({ src }: AlbumIntroPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>(initialState);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, []);

  const createAudio = () => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", () => {
      setState((current) => ({ ...current, duration: audio.duration, isLoaded: true, hasError: false }));
    });
    audio.addEventListener("timeupdate", () => {
      setState((current) => ({ ...current, currentTime: audio.currentTime }));
    });
    audio.addEventListener("play", () => setState((current) => ({ ...current, isPlaying: true, hasError: false })));
    audio.addEventListener("pause", () => setState((current) => ({ ...current, isPlaying: false })));
    audio.addEventListener("ended", () => setState((current) => ({ ...current, isPlaying: false, currentTime: 0 })));
    audio.addEventListener("error", () => setState((current) => ({ ...current, hasError: true, isPlaying: false })));
    audio.src = src;
    audioRef.current = audio;
    return audio;
  };

  const togglePlayback = async () => {
    const audio = createAudio();
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setState((current) => ({ ...current, hasError: true, isPlaying: false }));
      }
      return;
    }
    audio.pause();
  };

  const progress = state.duration ? Math.min((state.currentTime / state.duration) * 100, 100) : 0;
  const status = state.hasError
    ? "Wiedergabe konnte nicht gestartet werden. Bitte erneut versuchen."
    : state.isLoaded
      ? `${formatTime(state.currentTime)} / ${formatTime(state.duration)}`
      : "00:00 / --:--";

  return (
    <div className="player album-intro-player" aria-label="Album-Intro-Player">
      <button
        type="button"
        className="player-button"
        onClick={togglePlayback}
        aria-label={state.isPlaying ? "Album Intro pausieren" : "Album Intro starten"}
      >
        {state.isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
      </button>
      <span className="player-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></span>
      <span className="player-time" aria-live="polite">{status}</span>
      <Volume2 size={15} aria-hidden="true" />
    </div>
  );
}
