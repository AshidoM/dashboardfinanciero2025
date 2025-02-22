export const playStartupSound = () => {
  const audio = new Audio(
    "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
  );
  audio.volume = 0.3; // Set volume to 30%
  audio.play().catch((error) => {
    // Ignore errors since audio is not critical
    console.log("Audio playback failed:", error);
  });
};
