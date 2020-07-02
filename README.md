# vue-study
[웹 게임을 만들며 배우는 Vue](https://www.inflearn.com/course/web-game-vue/dashboard)를 공부한 내용

<br>

### 1. Vue, React 모두 바뀌는 것을 중심으로 생각해봐야 한다.

### 2. 데이터만 관리하면 데이터에 따라 뷰를 그려주는건 `Vue.js` 가 처리한다.

```html
<body>
    <div id="root">
        <div v-if="liked">좋아요 눌렀음</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
<script>
    const app = new Vue({
        el : '#root',
        data : {
            liked: false,
        },
        methods: {
            onClickButton(){
                this.liked = true;  //this.liked는 data.liked 를 뜻함
            },
        },
    });
</script>
```

<br>

### 3. `v-` 가 붙은 속성의 값에는 자바스크립트 코드를 사용할 수 있다.

```jsx
<body>
    <div id="root">
        <div v-if="liked + 1">좋아요 눌렀음</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
```

또한 예약어는 사용할 수 없다.
```jsx
<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit="onSubmitForm">
            <input ref="answer" maxlength="4" v-model="value" />
            <button>입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">{{t}}</li> 
        </ul>
    </div>
</template>
```

<br>

### 4. 인접 형제는 붙어있어야 작동한다.

**인접하지 않은 예시**
인접하지 않은 v-if, v-else문은 적상 작동을 하지 않게 된다.

```html
<body>
    <div id="root">
        <div v-if="liked + 1">좋아요 눌렀음</div>
				<div>깍두기</div>
        <button v-else v-on:click="onClickButton">Like</button>
    </div>
</body>
<script>
    const app = new Vue({
        el : '#root',
        data : {
            liked: false,
        },
        methods: {
            onClickButton(){
                this.liked = true;  //this.liked는 data.liked 를 뜻함
            },
        },
    });
</script>
```
<br>

### 5. 뷰의 html쪽에서는 Kebab-case로 작성해야 하고 자바스크립트에서는 Camel case로 작성해야 Vue가 인식한다.

### 6. webpack은 script파일이 많아지면 하나로 합쳐서 관리하기 위해 사용한다.

### 7. index.vue 확장자는 자바스크립트 파일이라고 생각하면 된다. 즉 vue의 component를 작성하는 곳이다.

### 8. require와 module.exports는 node 환경에서 패키지를 사용할 때 쓰이고 import, exports.default 는 vue 환경에서 패키지 사용할 때 쓰인다.

**node**
```jsx
// webpack.config.js
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
```

**vue - import**
```jsx
// 3.숫자야구/main.js
import Vue from 'vue';
import NumberBaseball from './NumberBaseball';

new Vue(NumberBaseball).$mount('#root');  //vue 인스턴스
```

**vue - exports.default**
```jsx
// 3.숫자야구/NumberBaseball.vue
export default {
    data(){
        return{
            answer: getNumbers(),
            tries: [],
            value: '',
            result: '',
        }
    },
    methods: {  //화면과 밀접한 메서드만 생성
        onSubmitForm(e){
            if(this.value === this.answer.join('')){   //정답 맞췄다면
                this.tries.push({
                    try: this.value,
                    result: '홈런',
                });
                this.result = '홈런';
                alert('게임을 다시 실행합니다.');
                this.value = '';
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            }else{  //정답 틀렸을 때
                if(this.tries.length >= 9){ //10번째 시도했을 때
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')}였습니다!`;
                    alert('게임을 다시 실행합니다.');
                    this.value = '';
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                }

                let strike = 0;
                let ball = 0;
                const answerArray = this.value.split('').map(v => parseInt(v));
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === this.answer[i]){  //숫자 자릿수 모두 정답
                        strike++;
                    }else if(this.answer.includes(answerArray[i])){ //숫자만 정답
                        ball++;
                    }
                }
                this.tries.push({
                    try: this.value,
                    result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                });
                this.value = '';
                this.$refs.answer.focus();
            }
        }
    }
}
```

<br>

### 9. vue와 vue-template-compiler의 버전이 동일해야 한다.

### 10. 특정 버전 패키지 설치하고 싶다면 `@` 를 사용하면 된다

`@` 를 사용하지 않으면 항상 최신 버전으로 설치된다

```jsx
// 특정 버전 설치
npm i vue@2.7.0

// 최신 버전 설치
npm i vue
```

<br>

### 11. `v-on:` === `@` 와 `e.preventDefault()` 생략

```jsx
//수정전
<form v-on:submit.prevent="onSubmitForm">

//수정후
<form @submit="onSubmitForm">

//e.preventDefault() 생략 및 축약
<form @submit.prevent="onSubmitForm">

```