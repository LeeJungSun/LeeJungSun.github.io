import newsSection from './newsSection.js'
import {fnNewsListTemplate} from '../templates/news.js'

window.addEventListener("DOMContentLoaded", () => {
    const url = "/data/newslist.json";
    const news = new newsSection(url);
    news.init(fnNewsListTemplate);
});