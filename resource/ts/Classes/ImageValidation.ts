/*

画像に関するバリデーションを行う

*/

export class ImageValidation {
    static sizes = {
        min: 1,
        max: 10000000
    }
    static allowExtensions: string[] = [
        'jpg',
        'jpeg',
        'gif',
        'png'
    ];
    static allowRatios = {
        ratios: [
            {
                width: 16,
                height: 9
            },
            {
                width: 4,
                height: 3
            }
        ],
        // 差分許容5%
        buffer: 0.05
    };

    // エラー、その他メッセージにて使用
    static message(errorNum: number, addInfo = null): string {
        let message: string;
        switch(errorNum) {
            case 1:
                message = 'jpg、jpeg、png、gif以外のフォーマットのものを指定しないでください';
            break;
            case 2:
                message = '画像を指定してください';
            break;
            case 3:
                message = '画像サイズは' + this.sizes.max + 'より小さいものを指定してください';
            break;
            case 4:
                message = '画像サイズは' + this.sizes.min + 'より大きいものを指定してください';
            break;
            case 5:
                let ratios: string = "";
                this.allowRatios.ratios.forEach((allowRatio: {[key: string]: number}) => {
                    if(allowRatio.width && allowRatio.height) {
                        ratios += `${allowRatio.width}:${allowRatio.height}、`
                    }
                });
                message = `縦横比は${ratios}のどれかで指定してください`
        }

        return message;
    }

    // 拡張子、データ規格(imageのみ)を判定
    static chkExtension(mimeType: string, opts: Array<string> | null = null): [boolean, string] {
        let result: boolean = false;
        let errMsg: string;
        const type: string = mimeType.split('/')[0];
        const extension: string = mimeType.split('/')[1];
        let allowExtensions: Array<string>;

        if(opts) {
            allowExtensions = opts;
        } else {
            allowExtensions = this.allowExtensions;
        }

        if(type === 'image') {
            // チェック対象がallowExtensionsプロパティに入っているか検証する
            allowExtensions.forEach((allowExtension: string) => {
                if(allowExtension === extension) {
                    result = true;
                }
            });
            if( ! result) {
                errMsg = this.message(1);
            }
        } else {
            errMsg = this.message(2);
        }
        
        return [result, errMsg];
    }

    // 画像サイズを判定
    static chkSize(size: number, opts: {min: number, max: number} | null = null): [boolean, string] {
        let result: boolean = false;
        let errMsg: string;

        if(opts) {
            this.sizes = opts;
        }

        if(size > this.sizes.max) {
            errMsg = this.message(3);
        } else if(size < this.sizes.min) {
            errMsg = this.message(4);
        } else {
            result = true;
        }

        return [result, errMsg];
    }

    // 画像の縦横比を判定
    static chkRatio(sizes: {width: number, height: number}, opts = null): [boolean, string] {
        let result: boolean = false;
        let errMsg: string;

        if(opts) {
            this.allowRatios = opts;
        }

        this.allowRatios.ratios.forEach((allowRatio: {[key: string]: number}) => {
            const baseRatio: number = allowRatio['height'] / allowRatio['width'];
            const ratio: number = sizes['height'] / sizes['width'];
            
            // this.allowRtiosの縦横を割った数と引数の縦横を割った数がニアイコール(bufferで指定した範囲)だった場合true
            if((baseRatio < (ratio + this.allowRatios.buffer)) && ((baseRatio + this.allowRatios.buffer) > ratio)) {
                result = true
            } else {
                errMsg = this.message(5, this.allowRatios.ratios);
            }
        });

        return [result, errMsg]
    }
}