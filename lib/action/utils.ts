export function getTimeAgo(joined: Date): string {
  const now = new Date();
  const diff = now.getTime() - joined.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `- asked ${years} ${years === 1 ? "year" : "years"} ago`;
  } else if (months > 0) {
    return `- asked ${months} ${months === 1 ? "month" : "months"} ago`;
  } else if (weeks > 0) {
    return `- asked ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (days > 0) {
    return `- asked ${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `- asked ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `- asked ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return `- asked ${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }
}
