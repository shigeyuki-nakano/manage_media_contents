(function() {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.get('page') !== 'videos') {
        return false;
    }

    window.addEventListener('load', (): void => {
        const rootElement: HTMLElement = document.querySelector('.js-media-preview');
        const formElement: HTMLInputElement = rootElement.querySelector('.js-media-preview__form');
        const previewElement: HTMLElement = rootElement.querySelector('.js-media-preview__preview');
        const switcherElement: HTMLElement = rootElement.querySelector('.js-media-preview__switcher');
    
        formElement.addEventListener('blur', function(e: Event) {
            const url: string = this.value;
            if( ! url) {
                return false;
            }
            switcherElement.classList.add('is-active');
            previewElement.setAttribute('src', url);
        });
    })
})()