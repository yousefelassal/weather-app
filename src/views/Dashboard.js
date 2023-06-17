import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Dashboard");
    }

    async getHtml(){
        return `<h1 class="text-3xl">Dashboard</h1>`;
    }

    async getJs(){
        console.log("Dashboard.js");
    }
}