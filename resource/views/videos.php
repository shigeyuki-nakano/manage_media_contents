<article class="p-section">
    <h1 class="p-section__title">動画管理</h1>
    <form method="POST" action="" class="p-form">
        <div class="js-media-preview">
            <section class="p-form__section">
                <div class="c-media-preview--16-9 js-media-preview__move-able" data-index="0">
                    <iframe class="c-media-preview__preview js-media-preview__preview" src="" frameborder="0"></iframe>
                </div>
            </section>
            <div class="p-add-btn">
                <span class="c-plus-icon p-add-btn__btn js-media-preview__add"></span>
            </div>
            <section class="p-form__section u-mt-100px">
                <label for="videos" class="p-form__label">動画プレビューURL(focus外すとプレビューを表示する)</label>
                <input type="text" name="videos[]" class="p-form__input c-input js-media-preview__form">
            </section>
        </div>
        <section class="p-form__submit">
            <input type="submit" class=" c-kaku-btn">
        </section>
    </form>
</article>