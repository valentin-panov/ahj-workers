export default function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  // const months = [
  //   'января',
  //   'февраля',
  //   'марта',
  //   'апреля',
  //   'мая',
  //   'июня',
  //   'июля',
  //   'августа',
  //   'сентября',
  //   'октября',
  //   'ноября',
  //   'декабря',
  // ];
  // const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formatTime = (x) => (x < 10 ? `0${x}` : x);

  return `${formatTime(hours)}:${formatTime(minutes)} ${formatTime(day)}.${formatTime(
    month
  )}.${year}`;
}
