import { VideoPreview } from './Classes/VideoPreview';

(function() {
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.get('page') !== 'videos') {
        return false;
    }

    new VideoPreview({
        classNames: {
            root: 'js-media-preview',
            childs: {
                add: '__add',
                preview: '__preview',
                form: '__form',
                moves: '__move-able',
            }
        }
    });
})()