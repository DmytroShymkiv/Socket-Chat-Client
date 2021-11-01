export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const handleError = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    console.log(error);
    let errors = error.response.data;
    if (errors.join) errors = errors.join("\n");
    else if (errors.message) errors = errors.message;
    return { errors };
  }
};

export const getTimeAgo = (time) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const currentDate = new Date();
  const sentDate = new Date(time);

  const dateDiff = new Date(currentDate - sentDate);

  const timesAgo = [
    { key: "year", value: dateDiff.getFullYear() - 1970 },
    { key: "month", value: dateDiff.getMonth() },
    { key: "day", value: dateDiff / DAY },
    { key: "hour", value: dateDiff / HOUR },
    { key: "minute", value: dateDiff / MINUTE },
    { key: "second", value: dateDiff / SECOND },
  ];

  for (const timeAgo of timesAgo) {
    let { key, value } = timeAgo;
    value = Math.floor(value);
    if (value > 0) return `${value} ${formatEnding(value, key)} ago`;
  }
  return "now";
};

const formatEnding = (value, time) => {
  if (value > 1) time = time + "s";
  return time;
};

export const sortChats = (chats) => {
  if (!chats) return [];
  return chats.sort((a, b) => b.time - a.time);
};
