export default class newsSection {
    constructor(fetchUrl) {
        this.fetchUrl = fetchUrl;
    }

    init(fnNewsListTemplate) {
        this.fetchData();
        this.newsTemplate = fnNewsListTemplate;
        this.currentIndex = 0;
    }
    
    fetchData(fetchUrl) {
        // console.log(this.url)
        fetch(this.fetchUrl)
            .then(res => res.json())
            .then(this.makeNewsContent.bind(this))
    }

    makeNewsContent(obj) {
        const content = this.newsTemplate(obj[this.currentIndex]);
        document.querySelector('.content').innerHTML = content;
    }
}
