/**
 * To format time mm:ss
 */
export function formatTime(value: number): string {
	const minutes = Math.floor(value / 60);
	const seconds = Math.round(value - minutes * 60);

	const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
	const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

	return [displayMinutes, displaySeconds].join(":");
}
