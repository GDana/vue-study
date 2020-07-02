const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');   //노드가 만들어주는 절대경로 스크립트

module.exports = {
    mode: 'development',    //development: 개발할 때 사용, production: 배포할 때 사용
    devtool: 'eval',  //eval: 웹팩이 build하는 속도가 빨라지기 때문에 개발할 때 사용한다, hidden-source-map: 배포할 때 사용
    resolve:{   //resolve: 확장자들을 처리해준다
        extensions: ['.js', '.vue'], 
        /* 
           적용전 : import NumberBaseball from './NumberBaseball.vue';
           적용후 : import NumberBaseball from './NumberBaseball';
        */
    },
    entry:{
        app: path.join(__dirname, 'main.js'),
        // app: './main.js',   //'app' : 하나로 합쳐질 스크립트 파일의 이름으로 app.js와 같은 형태가 된다.
    },
    module:{    // module: entry에서 처리할 수 없는 특정한 파일들을 처리해준다
        rules: [{   // 자바스크립트를 어떻게 합칠 것, 어떻게 처리할 것인지에 대한 rule
            test: /\.vue$/,
            use: 'vue-loader',   // vue 파일을 만났을 경우 vue-loader가 처리, user === loader 같은 역할
        }]
    },
    plugins:[   //plugins: module이 후처리하는 역할을 하며 output이 나오기 전에 한번더 가공해준다.
        new VueLoaderPlugin(),  // vue-loader와 함께 설치
    ],
    output:{
        filename: '[name].js', // '[name].js' === 'app.js' ->[name]을 사용하면 자동으로 entry의 app 이름으로 아웃풋을 만들어준다.
        path: path.join(__dirname, 'dist'), // __dirname : 현재경로
        // path: './dist', // 폴더경로 -> dist/app.js 가 생긴다 -> 상대경로로 하면 에러 발생 위와같이 수정해야한다
    },
};