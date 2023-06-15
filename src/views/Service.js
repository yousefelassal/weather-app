import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Service");
    }

    async getHtml(){
        return `<h1 class="text-3xl text-gray-950">Service</h1>`;
    }

    async getJs(){
        console.log("Service.js");
    }
}