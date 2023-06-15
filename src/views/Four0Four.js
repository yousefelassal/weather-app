import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("404");
    }

    async getHtml(){
        return `<div class="e404 h-screen bg-gray-50">
        <main>
            <div class="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
                <div class="max-w-lg mx-auto flex-1 flex-row-reverse gap-12 items-center justify-between md:max-w-none md:flex">
                    <div id="animation404" class="flex-1 max-w-2xl">
                        <img class="w-full" src="/src/assets/404.gif" alt="404" />
                    </div>
                    <div class="text-center">
                        <p class="text-base font-semibold text-blue-600">404</p>
                        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                        <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div class="mt-10 flex items-center justify-center gap-x-6">
                            <div class="flex text-sm font-semibold leading-6 text-gray-900 transition-all group">
                                <a href="/" data-link class="group-hover:pr-2 transition-all" aria-hidden="true"> &larr;</a>
                                <a href="/" data-link class="transition-all pl-1 group-hover:mr-2">Back to home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>`;
    }

    async getJs(){
        console.log("Four0Four.js");
    }
}