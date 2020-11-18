interface ChildHTMLClassMember<T, U = T, V = T> {
    add: T,
    preview: T
    form: U,
    moves: V,
}

// コンストラクタの引数
interface ArgPropaties {
    classNames: {
        root: string,
        childs: ChildHTMLClassMember<string>,
        switcher?: string,
    }
}

export class VideoPreview {
    private rootElement: HTMLElement;
    // interfaceのkeyがないため型エラー。後で治す
    private childElementMembers: ChildHTMLClassMember<HTMLElement, HTMLInputElement, HTMLCollection> = {};
    private rootClassName: string;
    private childClassNames: ChildHTMLClassMember<string>;
    private previewElement: HTMLElement;

    public constructor(args: ArgPropaties) {
        this.rootClassName = args.classNames.root;
        this.childClassNames = {
            add: args.classNames.childs.add,
            preview: args.classNames.childs.preview,
            form: args.classNames.childs.form,
            moves: args.classNames.childs.moves
        }

        window.addEventListener('load', () => {
            this.getRequireElements();
            this.previewURL();
            this.addPreview();
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
            case 3:
                msg = 'previewを表示するHTMLにプレビュークラスを追加してください';
            break;
            case 4:
                msg = 'プレビューを増やすときはすべて埋めてからにしてください';
            break;
        }

        return msg;
    }

    public getRequireElements() {
        // ルート要素のHTMLを取得
        this.rootElement = document.querySelector('.' + this.rootClassName);

        try {
            if( ! this.rootElement) {
                throw new Error(this.message(1, this.rootClassName));
            } else {
                // その配下に必要な子要素がいるか検証し、いなかったらエラー、いたらthis.childElementMembersに追加する
                // this.childClassNamesからメンバー名を参照
                Object.keys(this.childClassNames).forEach((key: string) => {
                    let childElement;
                    if(key === 'moves') {
                        childElement = this.rootElement.getElementsByClassName(this.rootClassName + this.childClassNames[key]);
                    } else {
                        childElement = this.rootElement.querySelector('.' + this.rootClassName + this.childClassNames[key]);
                    }
                    
                    if(childElement) {
                        this.childElementMembers[key] = childElement;
                    } else {
                        throw new Error(this.message(2, this.rootClassName + this.childClassNames[key]));
                    }
                });
            }
        } catch(e) {
            console.error("name:", e.name);
            console.error("message:", e.message);
            console.error("stack:", e.stack);
        }

    }

    public previewURL() {
        this.childElementMembers['form'].addEventListener('blur', (e: Event) => {
            const url: string = this.childElementMembers['form'].value;
            if( ! url) {
                return false;
            }

            Array.prototype.forEach.call(this.childElementMembers['moves'], (moveElement: HTMLElement) => {
                if( ! moveElement.classList.contains('is-active')) {
                    const previewElement: HTMLElement = moveElement.querySelector('.' + this.rootClassName + this.childClassNames['preview']);
                    if(previewElement) {
                        previewElement.setAttribute('src', url);
                        moveElement.classList.add('is-active')
                    } else {
                        console.error(this.message(3));
                    }
                }
            })
        });
    }

    public addPreview() {
        const moveElements: HTMLCollection = this.childElementMembers['moves'];
        const addElement: HTMLElement = this.childElementMembers['add'];

        // plusボタンを押したら対象を追加する処理
        addElement.addEventListener('click', (e: Event) => {
            let isAddEnable: boolean = true;

            // srcに何も入っていない状態のものを何個も増やすのを防ぐため
            Array.prototype.forEach.call(moveElements, (moveElement: HTMLElement) => {
                if( ! moveElement.classList.contains('is-active')) {
                    isAddEnable = false;
                    return;
                }
            })

            if( ! isAddEnable) {
                alert(this.message(4));
                return false;
            }
            const addTarget: HTMLElement = <HTMLElement>moveElements[0].cloneNode(true);
            const lastMoveElement: HTMLElement = <HTMLElement>moveElements[moveElements.length - 1];
            const index: number = parseInt(lastMoveElement.getAttribute('data-index'))
            
            lastMoveElement.parentNode.insertBefore(addTarget, lastMoveElement.nextElementSibling);
            addTarget.setAttribute('data-index', String(index + 1));
            addTarget.classList.add('u-mt-5');

            if(addTarget.classList.contains('is-active')) {    
                addTarget.classList.remove('is-active');
                addTarget.querySelector('.js-media-preview__preview').removeAttribute('src');
            }
        })
    }
}