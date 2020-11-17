<article class="p-section">
    <h1 class="p-section__title">TOPページメディア管理</h1>
    <form method="POST" action="" class="p-form" enctype="multipart/form-data">
        <section class="p-form__section">
            <label for="hero_image" class="p-form__label">ヒーローイメージ</label>
            <div class="c-media-preview--16-9 u-mt-3 js-image-preview">
                <img class="js-image-preview__preview c-media-preview__preview">
                <span class="js-image-preview__icon c-plus-icon c-media-preview__icon c-plus-icon"></span>
                <input name="hero_image" type="file" class="p-form__input js-image-preview__form c-media-preview__form">
                <span class="js-image-preview__img-name c-media-preview__img-name"></span>
            </div>
        </section>
        <section class="p-form__section js-video-preview">
            <label for="mv" class="p-form__label">MV</label>
            <div class="c-media-preview--16-9 u-mt-3 js-video-preview__switcher">
                <iframe class="c-media-preview__preview js-video-preview__preview" src="" frameborder="0"></iframe>
            </div>
            <div class="u-mt-5">
                <span>※動画プレビューURLを記載(focus外すとプレビューを表示する)</span>
                <input type="text" name="mv" class="p-form__input c-input js-video-preview__form">
            </div>
        </section>
        <section class="p-form__section">
            <label for="profile_image" class="p-form__label">プロフィール画像</label>
            <div class="c-media-preview--16-9 u-mt-3 js-image-preview">
                <img class="js-image-preview__preview c-media-preview__preview">
                <span class="js-image-preview__icon c-plus-icon c-media-preview__icon c-plus-icon"></span>
                <input name="hero_image" type="file" class="p-form__input js-image-preview__form c-media-preview__form">
                <span class="js-image-preview__img-name c-media-preview__img-name"></span>
            </div>
        </section>
        <section class="p-form__section">
            <label for="profile_content" class="p-form__label">プロフィール内容</label>
            <textarea name="profile_content" id="" class="p-form__input c-textarea p-textarea"></textarea>
        </section>
        <section class="p-form__submit">
            <input type="submit" class="c-kaku-btn" value="送信">
        </section>
    </form>
</article>