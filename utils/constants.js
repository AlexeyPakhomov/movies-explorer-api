const regexUrl = /https?:\/\/(www\.)?[0-9a-zA-Z-]{1,100}\.[0-9a-zA-Z]{1,6}(\/[0-9a-zA-Z/\S]*)*/;
const PATTERN_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/i;
const PATTERN_NAME = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/i;

module.exports = { regexUrl, PATTERN_EMAIL, PATTERN_NAME };
