import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("Saved");
    }

    async getHtml(){
        return `<h1 class="text-3xl text-gray-950">Saved</h1>`;
    }

    async getJs(){
        console.log("Saved.js");
    }
}