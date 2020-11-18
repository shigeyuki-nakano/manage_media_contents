/*

    画像プレビューライブラリ(のつもり)
    使用する際はお好きなtsファイルに下記の用に指定する

    new ImagePreview({
        // 全項目必須ここから
        // クラス名を指定する
        classNames: {
            root: // 画像プレビューの対象のルートHTML要素,
            // クラス名は「(root要素のクラス名)__xx」を想定
            childs: {
                form: ドロップエリア(input[type="file"]を想定)クラスのサフィックス,
                preview: 画像タグ(img)クラスのサフィックス,
                mediaFileName: 挿入した画像の名前を表示するクラスのサフィックス
            }
        },
        // 全項目必須ここまで

        // 任意項目ここから
        // 検証設定(指定しない場合は自動)
        validation {
            // 配列にして複数指定可能(複数指定でなくても配列で指定)
            ratios: [
                {
                    width: 横比率,
                    height: 縦比率,
                },
                {
                    width: ...,
                    height: ...
                }
            ],
            // 許可する縦横比の誤差
            ratioBuffer: number = 0.05,

            // 配列で許可する拡張子を指定
            extensions: [
                jpg,
                png,
                gif...
            ],

            // 画像の最低容量を指定
            minSize = 1,
            // 画像の最高容量を指定
            maxSize = 100000,
        }
    })

    (例)
    new ImagePreview({
        classNames: {
            root: '.js-image-preview',
            childs: {
                dropArea: '__droparea',
                imgTag: '__img',
                imgName: '__img-name'
            }
        },
    })
*/

import { HTMLElementEvent } from './Interfaces/HTMLElementEvent';
import { ImageValidation } from './ImageValidation';

// 子要素のクラス名かHTMLElementを挿入する
interface ChildHTMLClassMember<T> {
    preview: T,
    form: T,
    mediaFileName: T 
}

// コンストラクタの引数
interface ArgPropaties {
    classNames: {
        root: string,
        childs: ChildHTMLClassMember<string>,
        switcher?: string,
    },
    validation: ImageValidationPropaties
}

interface ImageValidationPropaties {
    ratioConfig?: {
        ratios: Array<{
            width: number,
            height: number
        }>,
        buffer?: number
    },
    sizes?: {
        min: number,
        max: number
    }
    extensions: Array<string>,
}

export class ImagePreview {
    private rootElements: NodeListOf<HTMLElement>;
    private childElementMembersArray: {[key: number]: ChildHTMLClassMember<HTMLElement>} = {};
    private rootClassName: string;
    private childClassNames: ChildHTMLClassMember<string>;
    private validOpts: ImageValidationPropaties;
    private switcherHTMLClass: string;

    public constructor(args: ArgPropaties) {
        this.rootClassName = args.classNames.root;
        this.childClassNames = {
            preview: args.classNames.childs.preview,
            form: args.classNames.childs.form,
            mediaFileName: args.classNames.childs.mediaFileName,
        }
        this.validOpts = args.validation;

        window.addEventListener('load', () => {
            this.getRequireElements();

            for(let i = 0; i < this.rootElements.length; i++) {
                let rootElement: HTMLElement = this.rootElements[i];
                let childElementMembers: ChildHTMLClassMember<HTMLElement> = this.childElementMembersArray[i];
                this.registerImage(rootElement, childElementMembers);
                this.dragover(rootElement);
                this.dragleave(rootElement);
            }
        })
    }

    private message(msgNum: number, addInfo = null): string {
        let msg: string;
        switch(msgNum) {
            case 1:
                // rootのHTMLクラスがない時に使用
                msg = 'クラス名「' + addInfo + '」が存在しません';
            break;
            case 2:
                // 子要素のクラスが足りないときに使用
                msg = 'クラス名「' + addInfo + '」が存在しない箇所があります。ご確認の上追加を願います。';
            break;
        }

        return msg;
    }

    public getRequireElements() {
        // ルート要素のHTMLを取得
        this.rootElements = document.querySelectorAll('.' + this.rootClassName);

        try {
            if(this.rootElements.length === 0) {
                throw new Error(this.message(1, this.rootClassName));
            } else {
                
                // その配下に必要な子要素がいるか検証し、いなかったらエラー、いたらthis.childElementMembersに追加する
                for(let i = 0; i < this.rootElements.length; i++) {
                    // interfaceのkeyがないため型エラー。後で治す
                    this.childElementMembersArray[i] = {}
                    // this.childClassNamesからメンバー名を参照
                    Object.keys(this.childClassNames).forEach((key: string) => {
                        const childElement: HTMLElement = this.rootElements[i].querySelector('.' + this.rootClassName + this.childClassNames[key]);
                        if(childElement) {
                            this.childElementMembersArray[i][key] = childElement;
                        } else {
                            throw new Error(this.message(2, this.rootClassName + this.childClassNames[key]));
                        }
                    });
                }
            }
        } catch(e) {
            console.error("name:", e.name);
            console.error("message:", e.message);
            console.error("stack:", e.stack);
        }
    }

    public registerImage(rootElement: HTMLElement, childElementMembers: ChildHTMLClassMember<HTMLElement>) {
        rootElement.addEventListener('change', (e: HTMLElementEvent<HTMLInputElement>) => {
                const fileObj: any = e.target.files[0];
            try {
                // 拡張子の検証
                const extensionResult: [boolean, string] = ImageValidation.chkExtension(fileObj.type, this.validOpts.extensions);
                if( ! extensionResult[0]) {
                    throw new Error(extensionResult[1])
                }

                // 画像サイズの検証
                const sizeResult: [boolean, string] = ImageValidation.chkSize(fileObj.size, this.validOpts.sizes);
                if( ! sizeResult[0]) {
                    throw new Error(sizeResult[1])
                }
            } catch(err) {
                console.error("name:", err.name);
                console.error("message:", err.message);
                console.error("stack:", err.stack);
                alert(err.message);
            }

            const imageObj = new Image();
            let dataURL;

            const promise = new Promise(function(resolve, reject) {
                // srcに渡ってきたデータを処理
                imageObj.addEventListener('load', () => {
                    // 渡ってきた画像のwidth、heightを保存
                    const imageSizes: {width: number, height: number} = {
                        width: imageObj.naturalWidth,
                        height: imageObj.naturalHeight
                    }
                    // BlobURLはデータURLとして保存(Preview)表示の際に使用
                    dataURL = imageObj.src;
                    resolve(imageSizes);
                });
                
                // FileオブジェクトをBlobURLに変換し、Imageオブジェクトのsrcに渡す
                imageObj.src = URL.createObjectURL(fileObj);
            });

            promise.then((imageSizes: any) => {
                try {
                    // 画像比率の検証
                    const ratioResult: [boolean, string] = ImageValidation.chkRatio(imageSizes, this.validOpts.ratioConfig);
                    if(ratioResult[0]) {
                        childElementMembers.preview.setAttribute('src', dataURL);
                        childElementMembers.mediaFileName.innerHTML = fileObj.name;
                        rootElement.classList.add('is-active');
                    } else {
                        throw new Error(ratioResult[1]);
                    }
                } catch(e) {
                    console.error("name:", e.name);
                    console.error("message:", e.message);
                    console.error("stack:", e.stack);
                    alert(e.message);
                }
            })

        }, false);
    }

    public dragover(rootElement: HTMLElement) {
        rootElement.addEventListener('dragover', function(e: HTMLElementEvent<HTMLInputElement>) {
            this.classList.add('is-drag-over');
        }, false)
    }

    public dragleave(rootElement: HTMLElement) {
        rootElement.addEventListener('dragleave', function(e: HTMLElementEvent<HTMLInputElement>) {
            this.classList.remove('is-drag-over');
        }, false)
    }

}