export const formatDate = (strDate:string) => {
	let month = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
	let msUTC = Date.parse(strDate);
	let date = new Date(msUTC);
	return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
};
