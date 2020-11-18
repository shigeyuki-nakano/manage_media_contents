import { ImagePreview } from './Classes/ImagePreview';

(function() {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.get('page') !== 'TOP') {
        return false;
    }

    new ImagePreview({
        classNames: {
            root: 'js-image-preview',
            childs: {
                form: '__form',
                preview: '__preview',
                mediaFileName: '__img-name'
            }
        },
        validation: {
            sizes: {
                min: 1,
                max: 10000000
            },
            extensions: [
                'jpg',
                'jpeg',
                'gif',
                'png'
            ],
            ratioConfig: {
                ratios: [
                    {
                        width: 16,
                        height: 9
                    }
                ],
                // 差分許容5%
                buffer: 0.05
            }
        }
    });

    window.addEventListener('load', () => {
        const rootElement: HTMLElement = document.querySelector('.js-video-preview');
        const formElement: HTMLInputElement = rootElement.querySelector('.js-video-preview__form');
        const previewElement: HTMLElement = rootElement.querySelector('.js-video-preview__preview');
        const switcherElement: HTMLElement = rootElement.querySelector('.js-video-preview__switcher');
        let oldURL: string;
    
        formElement.addEventListener('blur', function(e: Event) {
            const newURL: string = this.value;
            if( ! newURL) {
                return false;
            } else if(newURL === oldURL) {
                return false;
            }

            switcherElement.classList.add('is-active');
            previewElement.setAttribute('src', newURL);
            oldURL = newURL
        });
    })
})();